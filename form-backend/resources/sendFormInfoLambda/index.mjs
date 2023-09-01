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
  let email = assembleEmail(event);
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ['aggreniertest@gmail.com', 'bobby.brice@gmail.com'],
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
    const isVerified = await isUserVerified(event);
    if (isVerified.verified) {
          sendSocketMessage(
      event,
      JSON.stringify({
        reponse: { ...response },
        ...event,
      })
    );
      const response = await ses.send(command);
      return {
        statusCode: 200,
        body: JSON.stringify({
          reponse: { ...response },
          ...event,
        }),
      };
    }
  } catch (error) {
      await sendSocketMessage(
      event,
      JSON.stringify({
        message: error,
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "rattlesnakes",
        event,
      }),
    };
  }
};

async function assembleEmail(event) {
  const s3Client = new S3Client({ region: "ca-central-1" });
  const file = readFileSync("./template.html", "utf-8");

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
  const urlHeaderTemplate = await getSignedUrl(s3Client, s3CommandHeaderTemplate, {
    expiresIn: 3600,
  });

  const header = readFileSync(urlHeaderTemplate, "utf-8");
  const headerTemplate = Handlebars.compile(header);
  const template = Handlebars.compile(file);
  const eventObject = JSON.parse(event);
  template({
    header: headerTemplate({ imgURL: urlHeaderImage }),
    radioRequestType: eventObject['radio-request-type'],
    requestTitle: eventObject['request-title-text-area'],
    requestDetails: eventObject['request-details-text-area'],
    useCase: eventObject['use-case-text-area'],
    references: eventObject['references-text-area'],
    radioRequestUrgent: eventObject['radio-request-urgent'],
    urgentDetails: eventObject['urgent-details-text-area'],
    dateRequestedDay: eventObject['date-requested-datepicker_dayControl'],
    dateRequestedMonth: eventObject['date-requested-datepicker_monthControl'],
    dateRequestedYear: eventObject['date-requested-datepicker_yearControl']
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

async function isUserVerified(event) {
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
