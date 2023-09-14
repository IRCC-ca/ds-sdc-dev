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
Flow diagram is located in the form-backend assets folder for visual reference.

## Backend Stack
### S3 Bucket
Government of Canada header and footer images are stored to S3 and fetched using a presigned URL when the email template is being assembled in the `sendVerificationEmailLambda` and `sendFormInfoLambda`.

### Policies
Policies grant permissions to the AWS resources being created and executed in the project:
  - sesPolicyStatement
  - executeApiPolicyStatement
  - InvokeFunctionPolicyStatement
  - AllowS3AccessPolicyStatement
  - dynamoDbLambdaPolicyStatement

### Lambda
The project leverages several lambdas performing a specific function to the execution flow of the project.

`onConnectLambda` 
- establishes the connection to the web socket via API Gateway when the Email Verification Component is loaded on the request form page.

`sendVerificationEmailLambda`
- executes when a user provides their email address on the request form and clicks 'submit', the lambda captures the email, a connectionId, and a routeKey from the event object and performs the following operations:
  - fetches the header and footer assets from S3
  - assembles the email template using handlebars
  - triggers the crudUserLambda where the routeKey identifies the logic to execute, creating a new user in a DynamoDb table (email, connectionId, verified (boolean), and the current date)
  - sends the email to the requestor to verify the email address using AWS SES
  - returns a status message via web socket to update the front end UI / state

`verificationClickEventLambda`
- executes when a user clicks, 'verify' in the email received from the 'sendVerificationEmailLambda' above
- triggers the crudUserLambda where the 'updateClientRoute' routeKey identifies the logic to execute, updating the 'verified' column in the table to TRUE
- assembles html and produces a new client tab/window indicating that they have been verified where the window will automatically close in 5 seconds
- returns a status message to the web socket via ApiGateway to update the front end UI / state allowing the user to submit the form

`sendFormInfoLambda`
- executes after a user submits their request form and performs the following operations:
  - calls the crudUserLambda with routeKey 'isUserVerifiedRoute'which checks that the user has been verified in the DB table
  - assembles the data from the FE into an email (handlebars, S3 assets, and AWS SES) to the Design System inbox
  - returns a status update to the FE UI to confirm the email has been sent
  - calls the crudUserLambda with routeKey 'deleteUserRoute' and the unique connectionId to remove the user from the DB table