import { ConfigService } from './services/config.service.interface';
import { IskaypetApiConfig } from './models/iskaypet-api-config';
import * as path from 'path';

const dotenvPath = path.resolve(__dirname, '../../../../', '.env');
require('dotenv').config({ path: dotenvPath })

/**
 * Service class to manage the config properties for the iskaypet-api
 *
 * @see ConfigService
 */
export class ApiConfigService implements ConfigService {
  private config: IskaypetApiConfig;

  static instance: ApiConfigService;

  static getInstance(): ApiConfigService {
    if (!this.instance) {
      this.instance = new ApiConfigService();
    }
    return this.instance;
  }

  constructor() {

    this.config = new IskaypetApiConfig({
      development: Boolean(process.env['DEVELOPMENT']),
      loggerLevel: 'process.env.LOG_LEVEL',
      api: {
        version: 'v1',
        prefix: process.env['API_PREFIX'] || '',
        envPrefix: process.env['ENV_PREFIX'] || '',
      },
      aws: {
        region: process.env['AWS_REGION'],
        accessKeyId: process.env['ACCESS_KEY_ID'],
        secretAccessKey: process.env['SECRET_ACCESS_KEY']
      }
    });
  }

  getConfig(): IskaypetApiConfig {
    return this.config;
  }
}
