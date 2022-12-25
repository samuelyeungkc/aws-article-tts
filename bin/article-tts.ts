#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ArticleTtsStack } from '../lib/article-tts-stack';

const app = new cdk.App();
new ArticleTtsStack(app, 'article-tts-stack');
