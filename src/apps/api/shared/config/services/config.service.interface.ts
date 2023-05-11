import { BaseConfig } from '../models/base-config';
/**
 * Interface that should be implemented by a
 * Config Service class to give access to the config data.
 */
export interface ConfigService {
  /**
   * Method to get the config data
   */
  getConfig(): BaseConfig;
}
