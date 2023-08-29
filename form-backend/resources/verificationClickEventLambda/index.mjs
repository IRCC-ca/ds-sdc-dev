import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

export const handler = async (event) => {
  const connectionId = event.queryStringParameters.id;

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

      body: JSON.stringify({
        message: "You Have been veried!",
        id: connectionId,
      }),
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
