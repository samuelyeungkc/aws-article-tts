import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class ArticleTtsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const func = new NodejsFunction(this, 'tts-function', {
      runtime: Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../lambda/index.ts')
    });
    func.role?.attachInlinePolicy(
      new Policy(
        this,
        'allow-polly',
        {
          statements: [
            new PolicyStatement({
              actions: ['polly:SynthesizeSpeech'],
              resources: ['*']
            })
          ]
        }
      )
    );

    const api = new LambdaRestApi(this, 'Endpoint', {
      handler: func,
    });

  }
}
