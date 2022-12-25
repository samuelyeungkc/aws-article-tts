# Deploy and test

deploy with CDK using one of the following command
* `npx cdk deploy` deploy 
* `npx cdk watch` watch for changes and redeploy

You should find a line in the output similar to the following
`article-tts-stack.Endpoint8024A810 = https://6tmhcsdmxf.execute-api.us-east-1.amazonaws.com/prod/`

Run `npx http-server`. Open the local address and paste the url and text into the page
You should hear the text being spoken


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
