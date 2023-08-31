import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { readFileSync } from "fs";
import * as AWS from "aws-sdk";
import Handlebars from "handlebars";

export const handler = async (event) => {
  const bucketName = process.env.bucketName;
  const key = "gocheader.png";
  const s3 = new AWS.S3();
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const data = await s3.getObject(params).promise();
  const content = data.Body.toString("utf-8");

  console.log("Object content:", content);

  const ses = new SESClient({ region: "ca-central-1" });

  let to = "";
  if (event.body) {
    to = JSON.parse(event?.body).email || "";
  }

  const connectionId = event.requestContext.connectionId;
  const endpointURL = process.env.endpoindHttpApi;
  let endpoint = `${endpointURL}/verify?id=${connectionId}`;
  const file = readFileSync("./template.html", "utf-8");
  const header = readFileSync("./template-header.html", "utf-8");
  const template = Handlebars.compile(file);
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: template({
            header: header,
            endpoint: endpoint,
            verify_text: "Verify / Vérifier",
            english_text: "Click the button to verify your email",
            french_text: "Appuyer sur le bouton pour vérifier votre address",
          }),
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
