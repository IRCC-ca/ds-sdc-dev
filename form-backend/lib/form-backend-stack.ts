import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as apigateway from "@aws-cdk/aws-apigatewayv2-alpha";
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
export class FormBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Policies
    const sesPolicyStatement = new iam.PolicyStatement({
      actions: ["ses:*"],
      resources: ["*"],
    });
    const executeApiPolicyStatement = new iam.PolicyStatement({
      actions: ["execute-api:Invoke", "execute-api:ManageConnections"],
      resources: ["arn:aws:execute-api:*:*:*"],
    });
    const dynamoDbLambdaPolicyStatement = new iam.PolicyStatement({
      actions: ["dynamodb:PutItem", "dynamodb:UpdateItem", "dynamodb:DeleteItem", "dynamodb:UpdateTable", "dynamodb:ListTables", "dynamodb:GetItem",],
      resources: ["arn:aws:dynamodb:::table/"],
    });

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
      new iam.Policy(this, "sesPolicySendVerificationEmailFunction", {
        statements: [sesPolicyStatement],
      })
    );
    sendVerificationEmailLambda.role?.attachInlinePolicy(
      new iam.Policy(this, "executeApiSendVerificationEmailFunction", {
        statements: [executeApiPolicyStatement],
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
      new iam.Policy(this, "executeApiverificationClickEventFunction", {
        statements: [executeApiPolicyStatement],
      })
    );

    //Lambdas
    const crudUserLambda = new lambda.Function(
      this,
      "crudUserEventFunction",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("resources/crudUserLambda"),
      }
    );
    crudUserLambda.role?.attachInlinePolicy(
      new iam.Policy(this, "dynamoDbCrudUserEventFunction", {
        statements: [dynamoDbLambdaPolicyStatement],
      })
    );

    //APIGateways
    const webSocketApi = new apigateway.WebSocketApi(
      this,
      "DesignSystem-SocketAPI"
    );
    new apigateway.WebSocketStage(this, "prodStage", {
      webSocketApi,
      stageName: "production",
      autoDeploy: true,
    });
    webSocketApi.addRoute("sendVerificationEmailRoute", {
      integration: new integrations.WebSocketLambdaIntegration(
        "sendVerificationEmailRoute",
        sendVerificationEmailLambda
      ),
    });

    const httpApi = new apigateway.HttpApi(this, "DesignSystem-HTTPAPI");
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
      name: 'id',
      type: dynamodb.AttributeType.STRING
    };
    
    // Create the DynamoDB table
    const table = new dynamodb.Table(this, 'DSRequestFormTable', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      tableName: 'DSRequestFormTable' 
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

    verificationClickEventLambda.addEnvironment(
      "endpoindHttpApi",
      httpApi.apiEndpoint
    );
    verificationClickEventLambda.addEnvironment(
      "endpoindwebSocketApi",
      webSocketApi.apiEndpoint
    );
    crudUserLambda.addEnvironment(
      "endpoindHttpApi",
      httpApi.apiEndpoint
    );
    crudUserLambda.addEnvironment(
      "endpoindwebSocketApi",
      webSocketApi.apiEndpoint
    );
    crudUserLambda.addEnvironment(
      "TableName",
      table.tableName
    );
  } 
}
