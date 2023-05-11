import { AWSConfigModel } from './aws-config.model';

/**
 * Class to keep the config properties for AWS
 */
export class AWSConfig {
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;

  constructor(config: AWSConfigModel) {
    this.region = config?.region;
    this.accessKeyId = config?.accessKeyId;
    this.secretAccessKey = config?.secretAccessKey;
  }
}
