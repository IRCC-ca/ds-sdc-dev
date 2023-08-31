import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { readFileSync } from "fs";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Handlebars from "handlebars";

export const handler = async (event) => {
  const ses = new SESClient({ region: "ca-central-1" });

  let to = "";
  if (event.body) {
    to = JSON.parse(event?.body).email || "";
  }
  let email = await assembleEmail(event);

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: email,
        },
      },
      Subject: { Data: "Test Email" },
    },
    Source: "alexandre.grenier@cic.gc.ca",
  });
  try {
    const response = await ses.send(command);
    console.log(response);
    sendSocketMessage(
      event,
      JSON.stringify({
        reponse: { ...response },
        ...event,
      })
    );
    await createUser(event);
    return {
      statusCode: 200,
      body: JSON.stringify({
        reponse: { ...response },
        ...event,
      }),
    };
  } catch (error) {
    console.log(error);
    await sendSocketMessage(
      event,
      JSON.stringify({
        message: error,
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
        event,
      }),
    };
  }
};

async function assembleEmail(event) {
  const s3Client = new S3Client({ region: "ca-central-1" });

  const file = readFileSync("./template.html", "utf-8");
  const header = readFileSync("./template-header.html", "utf-8");
  const headerTemplate = Handlebars.compile(header);
  const footer = readFileSync("./template-footer.html", "utf-8");
  const footerTemplate = Handlebars.compile(footer);
  
  const connectionId = event.requestContext.connectionId;
  const endpointURL = process.env.endpoindHttpApi;
  let endpoint = `${endpointURL}/verify?id=${connectionId}`;

  const s3CommandHeaderImage = new GetObjectCommand({
    Bucket: process.env.bucketName,
    Key: "gocheader.png",
  });
  const urlHeaderImage = await getSignedUrl(s3Client, s3CommandHeaderImage, {
    expiresIn: 3600,
  });

  const s3CommandFooterImage = new GetObjectCommand({
    Bucket: process.env.bucketName,
    Key: "gocwordmark.png",
  });
  const urlFooterImage = await getSignedUrl(s3Client, s3CommandFooterImage, {
    expiresIn: 3600,
  });

  const template = Handlebars.compile(file);

  return template({
    header: headerTemplate({ imgURL: urlHeaderImage }),
    footer: footerTemplate({ imgURL: urlFooterImage }),
    endpoint: endpoint,
    verify_text: "Verify / Vérifier",
    english_text: "Click the button to verify your email",
    french_text: "Appuyer sur le bouton pour vérifier votre address",
  });
}

async function sendSocketMessage(event, message) {
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const connectionId = event.requestContext.connectionId;
  const callbackUrl = `https://${domain}/${stage}`;
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });
  const requestParams = {
    ConnectionId: connectionId,
    Data: JSON.stringify({
      message: message,
      id: connectionId,
    }),
  };
  const command = new PostToConnectionCommand(requestParams);
  try {
    await client.send(command);
  } catch (error) {
    console.log(error);
  }
}

async function createUser(event) {
  const client = new LambdaClient();
  const command = new InvokeCommand({
    FunctionName: process.env.crudUserLambda,
    Payload: JSON.stringify(event),
  });

  try {
    const response = await client.send(command);
  } catch (err) {
    console.log(err);
  }
}
