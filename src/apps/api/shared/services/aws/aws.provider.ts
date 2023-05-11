import config from '../../config';
import AWS from 'aws-sdk';

AWS.config.update({
  region: config.aws.region,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
});

export const AWSProvider = AWS;
export const dynamo = new AWSProvider.DynamoDB.DocumentClient();

