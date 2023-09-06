export const handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: "connected",
    }),
  };
};
