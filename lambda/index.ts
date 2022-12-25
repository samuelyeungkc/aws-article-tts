const {
  PollyClient,
  SynthesizeSpeechCommand,
} = require("@aws-sdk/client-polly");

// Set the AWS Region
const REGION = "us-east-1";

// Create an Amazon Polly service client object
const client = new PollyClient({ region: REGION });

const streamToString = async (stream: any) => {
  const chunks: any = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err: any) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
  })
}

const defaultConfigs = {
  Text: "Hello, this Node.js script will send this text to the AWS API where it will be converted to audio by AWS Polly.",
  OutputFormat: "mp3",
  VoiceId: "Joanna",
};

exports.handler = async (event: any) => {

  console.log(`event=${JSON.stringify(event)} body=${event.body} type=${typeof event.body}`);
  const { text, outputFormat, voice, textType, engine } = JSON.parse(event.body);
  try {

    const configs = {
      ...defaultConfigs,
      TextType: textType,
      Text: text,
      OutputFormat: outputFormat,
      VoiceId: voice,
      Engine: engine,
    };
    console.log(`mergedParams=${JSON.stringify(configs)}`);

    const data = await client.send(new SynthesizeSpeechCommand(configs));
    console.log(`success fully retrieve audio, metadata=${data.$metadata}`)
    const base64String = await streamToString(data.AudioStream);

    const body = {audioContent: base64String};
    return {
      "statusCode": 200,
      "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      "isBase64Encoded": false,
      "multiValueHeaders": {
        "X-Custom-Header": ["My value", "My other value"],
      },
      body: JSON.stringify(body)
    };

  } catch (e: any) {
    console.error('error=', e);
    return {'error': e.toString()};
  }
  return {'error': "unknown error occured"};
};
