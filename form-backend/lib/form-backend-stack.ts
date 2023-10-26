import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as apigateway from "@aws-cdk/aws-apigatewayv2-alpha";
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

export class FormBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let EMAIL_FROM = process.env.EMAIL_FROM || "";
    if (EMAIL_FROM.length === 0) {
      throw "Missing EMAIL_FROM from .env file";
    }
    let EMAIL_TO = process.env.EMAIL_TO || "";
    if (EMAIL_TO.split(", ").length === 0) {
      throw `Missing EMAIL_TO from .env file: EMAIL_TO=email@mail.com, email2@mail.com`;
    }

    // Create an S3 bucket
    const bucket = new s3.Bucket(this, "assets", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    const bucketPolicyStatement = new iam.PolicyStatement({
      actions: ["s3:GetObject"],
      resources: [`${bucket.bucketArn}/*`],
      principals: [new iam.ArnPrincipal("*")],
    });
    bucket.addToResourcePolicy(bucketPolicyStatement);

    // Upload a local folder to the S3 bucket
    new s3Deployment.BucketDeployment(this, "UploadFiles", {
      sources: [s3Deployment.Source.asset("assets")],
      destinationBucket: bucket,
    });

    //Policies
    const sesPolicyStatement = new iam.PolicyStatement({
      actions: ["ses:*"],
      resources: ["*"],
    });
    const executeApiPolicyStatement = new iam.PolicyStatement({
      actions: ["execute-api:Invoke", "execute-api:ManageConnections"],
      resources: ["arn:aws:execute-api:*:*:*"],
    });

    const InvokeFunctionPolicyStatement = new iam.PolicyStatement({
      actions: ["lambda:InvokeFunction"],
      resources: ["*"],
    });

    const AllowS3AccessPolicyStatement = new iam.PolicyStatement({
      actions: ["s3:*"],
      resources: [bucket.bucketArn],
    });

    const dynamoDbLambdaPolicyStatement = new iam.PolicyStatement({
      actions: [
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:UpdateTable",
        "dynamodb:ListTables",
        "dynamodb:GetItem",
      ],
      resources: ["arn:aws:dynamodb:::table/"],
    });

    //Lambdas
    const onConnectLambda = new lambda.Function(this, "onConnectFunction", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("resources/onConnectLambda"),
    });
    onConnectLambda.role?.attachInlinePolicy(
      new iam.Policy(this, "onConnectLambdaPolicy", {
        statements: [executeApiPolicyStatement, InvokeFunctionPolicyStatement],
      })
    );

    //Lambdas
    const sendVerificationEmailLambda = new lambda.Function(
      this,
      "SendVerificationEmailFunction",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("resources/sendVerificationEmailLambda"),
      }
    );
    sendVerificationEmailLambda.role?.attachInlinePolicy(
      new iam.Policy(this, "sendVerificationEmailLambdaPolicy", {
        statements: [
          sesPolicyStatement,
          executeApiPolicyStatement,
          InvokeFunctionPolicyStatement,
          AllowS3AccessPolicyStatement,
        ],
      })
    );

    //Lambdas
    const verificationClickEventLambda = new lambda.Function(
      this,
      "verificationClickEventFunction",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("resources/verificationClickEventLambda"),
      }
    );
    verificationClickEventLambda.role?.attachInlinePolicy(
      new iam.Policy(this, "verificationClickEventLambdaPolicy", {
        statements: [executeApiPolicyStatement, InvokeFunctionPolicyStatement],
      })
    );

    //Lambdas
    const crudUserLambda = new lambda.Function(this, "crudUserEventFunction", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("resources/crudUserLambda"),
    });
    crudUserLambda.role?.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonDynamoDBFullAccess")
    );

    //Lambdas
    const sendFormInfoLambda = new lambda.Function(
      this,
      "sendFormInfoFunction",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("resources/sendFormInfoLambda"),
      }
    );
    sendFormInfoLambda.role?.attachInlinePolicy(
      new iam.Policy(this, "sendFormInfoLambdaPolicy", {
        statements: [
          sesPolicyStatement,
          executeApiPolicyStatement,
          InvokeFunctionPolicyStatement,
          AllowS3AccessPolicyStatement,
        ],
      })
    );

    //APIGateways\
    let webSocketApiName = `DesignSystem-SocketAPI-${this.stackName}`;
    const webSocketApi = new apigateway.WebSocketApi(
      this,
      webSocketApiName,
      {}
    );
    new apigateway.WebSocketStage(this, "prodStage", {
      webSocketApi,
      stageName: "production",
      autoDeploy: true,
    });

    webSocketApi.addRoute("onConnectRoute", {
      integration: new integrations.WebSocketLambdaIntegration(
        "onConnectRoute",
        onConnectLambda
      ),
      returnResponse: true,
    });

    webSocketApi.addRoute("sendVerificationEmailRoute", {
      integration: new integrations.WebSocketLambdaIntegration(
        "sendVerificationEmailRoute",
        sendVerificationEmailLambda
      ),
      returnResponse: true,
    });

    webSocketApi.addRoute("sendFormInfoRoute", {
      integration: new integrations.WebSocketLambdaIntegration(
        "sendFormInfoRoute",
        sendFormInfoLambda
      ),
      returnResponse: true,
    });

    let httpApiName = `DesignSystem-HTTPAPI-${this.stackName}`;
    const httpApi = new apigateway.HttpApi(this, httpApiName);
    httpApi.addRoutes({
      path: "/verify",
      methods: [apigateway.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration(
        "verificationClickEventRoute",
        verificationClickEventLambda
      ),
    });

    //DynamoDb Table
    // Define the partition key
    const partitionKey: dynamodb.Attribute = {
      name: "id",
      type: dynamodb.AttributeType.STRING,
    };

    // Create the DynamoDB table
    let tableName = `DSRequestFormTable-${this.stackName}`;
    const table = new dynamodb.Table(this, tableName, {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      tableName: tableName,
    });

    //Add Endpoints to the Lambdas
    sendVerificationEmailLambda.addEnvironment(
      "endpoindHttpApi",
      httpApi.apiEndpoint
    );
    sendVerificationEmailLambda.addEnvironment(
      "endpoindwebSocketApi",
      webSocketApi.apiEndpoint
    );
    sendVerificationEmailLambda.addEnvironment(
      "crudUserLambda",
      crudUserLambda.functionName
    );
    sendVerificationEmailLambda.addEnvironment("bucketName", bucket.bucketName);
    sendVerificationEmailLambda.addEnvironment("EMAIL_FROM", EMAIL_FROM);

    verificationClickEventLambda.addEnvironment(
      "endpoindHttpApi",
      httpApi.apiEndpoint
    );
    verificationClickEventLambda.addEnvironment(
      "endpoindwebSocketApi",
      webSocketApi.apiEndpoint
    );
    verificationClickEventLambda.addEnvironment(
      "crudUserLambda",
      crudUserLambda.functionName
    );
    verificationClickEventLambda.addEnvironment(
      "bucketName",
      bucket.bucketName
    );

    sendFormInfoLambda.addEnvironment(
      "endpoindwebSocketApi",
      webSocketApi.apiEndpoint
    );

    sendFormInfoLambda.addEnvironment(
      "crudUserLambda",
      crudUserLambda.functionName
    );

    sendFormInfoLambda.addEnvironment("endpoindHttpApi", httpApi.apiEndpoint);

    sendFormInfoLambda.addEnvironment("bucketName", bucket.bucketName);

    sendFormInfoLambda.addEnvironment("EMAIL_FROM", EMAIL_FROM);
    sendFormInfoLambda.addEnvironment("EMAIL_TO", EMAIL_TO);

    crudUserLambda.addEnvironment("endpoindHttpApi", httpApi.apiEndpoint);
    crudUserLambda.addEnvironment(
      "endpoindwebSocketApi",
      webSocketApi.apiEndpoint
    );
    crudUserLambda.addEnvironment("TableName", table.tableName);
  }
}
