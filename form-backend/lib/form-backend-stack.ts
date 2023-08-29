import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as apigateway from "@aws-cdk/aws-apigatewayv2-alpha";
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";

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

    //Add Endpoints to the Lamndas
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
  }
}
