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
  event.requestContext.routeKey = "isUserVerifiedRoute";
  const ses = new SESClient({ region: "ca-central-1" });

  let to = "";
  let email = await assembleEmail(event);

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: process.env.EMAIL_TO.split(", "),
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
    Source: process.env.EMAIL_FROM,
  });

  try {
    const isVerified = await isUserVerified(event);
    if (isVerified) {
      const response = await ses.send(command);
      // Check if the email was sent successfully
      if (response.$metadata.httpStatusCode === 200) {
        const connectionId = event.requestContext.connectionId;
        // Call the deletion lambda
        await deleteUserData(connectionId);

        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "formSent",
          }),
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "reset",
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

  const s3CommandHeaderImage = new GetObjectCommand({
    Bucket: process.env.bucketName,
    Key: "gocheader.png",
  });
  const urlHeaderImage = await getSignedUrl(s3Client, s3CommandHeaderImage, {
    expiresIn: 3600,
  });

  const s3CommandHeaderTemplate = new GetObjectCommand({
    Bucket: process.env.bucketName,
    Key: "template-header.html",
  });
  const urlHeaderTemplate = await getSignedUrl(
    s3Client,
    s3CommandHeaderTemplate,
    {
      expiresIn: 3600,
    }
  );

  const template = Handlebars.compile(file);
  const eventObject = JSON.parse(event.body);
  const formObject = JSON.parse(eventObject.email);
  const requestData = [
  { label: 'Request Title', value: formObject["request-title-text-area"]},
  { label: 'Request Type', value: formObject["radio-request-type"] },
  { label: 'Request Details', value: formObject["request-details-text-area"] },
  { label: 'Use Case', value: formObject["use-case-text-area"] },
  { label: 'References', value: formObject["references-text-area"] ? formObject["references-text-area"] : '' },
  { label: 'Urgent Request?', value: formObject["radio-request-urgent"] ? formObject["radio-request-urgent"] : '' },
  { label: 'Urgent Request Details', value: formObject["urgent-details-text-area"] ? formObject["urgent-details-text-area"] : '' },
  // { label: 'Requested Date', value: `${formObject["date-requested-datepicker_monthControl"] }, ${formObject["date-requested-datepicker_dayControl"] }, ${formObject["date-requested-datepicker_yearControl"] }` }
];

  return template({
    header: headerTemplate({ imgURL: urlHeaderImage }),
    requestData
  });
}

async function isUserVerified(event) {
  const client = new LambdaClient();
  const command = new InvokeCommand({
    FunctionName: process.env.crudUserLambda,
    Payload: JSON.stringify(event),
  });

  try {
    let promisewait = await client.send(command);
    const textDecoder = new TextDecoder("utf-8");
    const decodedString = textDecoder.decode(promisewait.Payload);
    return JSON.parse(JSON.parse(decodedString).body).verified;
  } catch (err) {
    console.log(err);
  }
}

async function deleteUserData(connectionId) {
  const client = new LambdaClient();
  const payload = {
    requestContext: {
      connectionId: connectionId,
      routeKey: "deleteUserRoute",
    },
  };

  const command = new InvokeCommand({
    FunctionName: process.env.crudUserLambda,
    Payload: JSON.stringify(payload),
  });

  try {
    await client.send(command);
    console.log("Deletion lambda called successfully");
  } catch (err) {
    console.error("Error calling deletion lambda:", err);
  }
}
