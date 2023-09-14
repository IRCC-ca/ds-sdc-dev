# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


## Request Form Flow
* Flow diagram is located in the form-backend assets folder for visual reference.

## Backend Stack
# S3 Bucket
* Government of Canada header and footer images are stored to S3 and fetched using a presigned URL when the email template is being assembled in the 'sendFormInfoLambda'.

# Policies
* Policies grant permissions to the AWS resources being created and executed in the project

* sesPolicyStatement
* executeApiPolicyStatement
* InvokeFunctionPolicyStatement
* AllowS3AccessPolicyStatement
* dynamoDbLambdaPolicyStatement

# Lambda
* The project leverages several lambdas performing a specific function to the execution flow of the project.

* onConnectLambda - establishes the connection to the web socket via API Gateway when the Email Verification Component is loaded on the request form page.

* sendVerificationEmailLambda - 