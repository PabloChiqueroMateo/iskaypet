import { BaseConfigModel } from './base-config.model';

/**
 * Class to manage the base config properties
 */
export class BaseConfig {
  /**
   * Property to verify if local development is active
   */
  development: boolean;
  /**
   * Property to specify the logger level
   */
  loggerLevel: string;

  constructor(config: BaseConfigModel) {
    this.development = config.development;
    this.loggerLevel = config.loggerLevel;
  }
}
