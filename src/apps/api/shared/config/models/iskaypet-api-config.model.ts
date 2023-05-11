import { ApiConfigModel } from './api-config.model';
import { AWSConfigModel } from './aws-config.model';
import { BaseConfigModel } from './base-config.model';

/**
 * Type to represent the config properties for the iskaypet-api
 */
export type iskaypetApiConfigModel = BaseConfigModel & {
  api: ApiConfigModel;
  aws: AWSConfigModel;
};
