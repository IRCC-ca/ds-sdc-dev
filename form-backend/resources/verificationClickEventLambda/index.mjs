import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { readFileSync } from "fs";

export const handler = async (event) => {
  const connectionId = event.queryStringParameters.id;
  event.requestContext.routeKey = "updateClientRoute";
  event.requestContext.connectionId = connectionId;

  await updateUser(event);

  const file = readFileSync("./template.html", "utf-8");
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
  try {
    await client.send(command);
    const response = {
      statusCode: 200,
      body: file,
      headers: {
        "Content-Type": "text/html",
      },
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: error }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return response;
  }
};

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
