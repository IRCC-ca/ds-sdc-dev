import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { readFileSync } from "fs";

export const handler = async (event) => {
  const ses = new SESClient({ region: "ca-central-1" });
  const file = readFileSync("./template.html", "utf-8");
  const connectionId = event.requestContext.connectionId;
  const endpointURL = process.env.endpoindHttpApi;
  let endpoint = `${endpointURL}/verify?id=${connectionId}`;
  const template = assemble(file, "id");
  let to = "";
  if (event.body) {
    to = JSON.parse(event?.body).email || "";
  }
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: template(endpoint),
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
function assemble(literal, params) {
  return new Function(params, "return `" + literal + "`;");
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