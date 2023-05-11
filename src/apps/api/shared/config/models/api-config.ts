import { ApiConfigModel } from './api-config.model';

/**
 * Class to keep the config properties for the api
 */
export class ApiConfig {
  /**
   * Api version
   */
  version?: string;
  /**
   * Api prefix
   */
  prefix?: string;
  /**
   * Api env prefix
   */
  envPrefix: string;

  constructor(config: ApiConfigModel) {
    this.version = config?.version;
    this.prefix = config?.prefix;
    this.envPrefix = config?.envPrefix;
  }
}
