import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { readFileSync } from "fs";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Handlebars from "handlebars";

export const handler = async (event) => {
  const connectionId = event.queryStringParameters.id;
  event.requestContext.routeKey = "updateClientRoute";
  event.requestContext.connectionId = connectionId;

  await updateUser(event);

  let endpointURL = process.env.endpoindwebSocketApi;
  endpointURL = endpointURL.replace("wss:", "");
  const callbackUrl = `https://${endpointURL}/production`;
  const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });
  const requestParams = {
    ConnectionId: connectionId,
    Data: JSON.stringify({
      message: "You Have been veried!",
      id: connectionId,
    }),
  };
  const command = new PostToConnectionCommand(requestParams);
  let html = await assembleHTML(
    event,
    "Your email has been verified! - This window will automatically close in 5 seconds",
    "Votre adresse email a été vérifiée - Cette fenêtre se fermera automatiquement dans 5 secondes"
  );
  try {
    await client.send(command);
    const response = {
      statusCode: 200,
      body: html,
      headers: {
        "Content-Type": "text/html",
      },
    };
    return response;
  } catch (error) {
    html = await assembleHTML(
      event,
      "An error has occurred, please try again",
      "Une erreur s'est produite, veuillez réessayer"
    );
    const response = {
      statusCode: 200,
      body: html,
      headers: {
        "Content-Type": "text/html",
      },
    };
    return response;
  }
};

async function assembleHTML(event, english_text, french_text) {
  const s3Client = new S3Client({ region: "ca-central-1" });

  const file = readFileSync("./template.html", "utf-8");
  const header = readFileSync("./template-header.html", "utf-8");
  const headerTemplate = Handlebars.compile(header);
  const footer = readFileSync("./template-footer.html", "utf-8");
  const footerTemplate = Handlebars.compile(footer);
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
    english_text: english_text,
    french_text: french_text,
  });
}

async function updateUser(event) {
  const client = new LambdaClient();
  const command = new InvokeCommand({
    FunctionName: process.env.crudUserLambda,
    Payload: JSON.stringify(event),
  });

  try {
    return await client.send(command);
  } catch (err) {
    console.log(err);
  }
}
