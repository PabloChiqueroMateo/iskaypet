import { ApiConfig } from './api-config';
import { AWSConfig } from './aws-config';
import { BaseConfig } from './base-config';
import { BaseConfigModel } from './base-config.model';
import { iskaypetApiConfigModel } from './iskaypet-api-config.model';

/**
 * Class to keep the config properties for the iskaypet-api
 */
export class IskaypetApiConfig extends BaseConfig {
  api: ApiConfig;
  aws: AWSConfig;

  constructor(config: iskaypetApiConfigModel) {
    const baseConfig: BaseConfigModel = {
      development: config?.development,
      loggerLevel: config?.loggerLevel,
    };
    super(baseConfig);
    this.api = new ApiConfig(config?.api);
    this.aws = new AWSConfig(config?.aws);
  }
} 
