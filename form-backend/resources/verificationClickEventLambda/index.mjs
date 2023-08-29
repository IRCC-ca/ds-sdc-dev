import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

export const handler = async (event) => {
  const connectionId = event.queryStringParameters.id;

  const callbackUrl = `https://36rj0z1fre.execute-api.ca-central-1.amazonaws.com/production`;
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
      body: JSON.stringify(error),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return response;
  }
};
