import { ConfigurationService } from '~/server/services/configuration.service';

export class ServerConfigurationService implements ConfigurationService {
  getConfiguration(): EnvironmentVariables {
    return {
      API_ADRESSE_BASE_URL: ServerConfigurationService.getOrThrowError('API_ADRESSE_BASE_URL'),
      API_ENGAGEMENT_API_KEY_TOKEN: ServerConfigurationService.getOrThrowError('API_ENGAGEMENT_API_KEY_TOKEN'),
      API_ENGAGEMENT_BASE_URL: ServerConfigurationService.getOrThrowError('API_ENGAGEMENT_BASE_URL'),
      API_GEO_BASE_URL: ServerConfigurationService.getOrThrowError('API_GEO_BASE_URL'),
      API_LA_BONNE_ALTERNANCE_BASE_URL: ServerConfigurationService.getOrThrowError('API_LA_BONNE_ALTERNANCE_BASE_URL'),
      API_POLE_EMPLOI_BASE_URL: ServerConfigurationService.getOrThrowError('API_POLE_EMPLOI_BASE_URL'),
      FRONT_URL: ServerConfigurationService.getOrThrowError('FRONT_URL'),
      POLE_EMPLOI_CONNECT_CLIENT_ID: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_CLIENT_ID'),
      POLE_EMPLOI_CONNECT_CLIENT_SECRET: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_CLIENT_SECRET'),
      POLE_EMPLOI_CONNECT_SCOPE: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_SCOPE'),
      POLE_EMPLOI_CONNECT_URL: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_URL'),
      REDIS_DB: Number(ServerConfigurationService.getOrThrowError('REDIS_DB')),
      REDIS_HOST: ServerConfigurationService.getOrThrowError('REDIS_HOST'),
      REDIS_PASSWORD: ServerConfigurationService.getOrThrowError('REDIS_PASSWORD'),
      REDIS_PORT: Number(ServerConfigurationService.getOrThrowError('REDIS_PORT')),
      REDIS_USERNAME: ServerConfigurationService.getOrThrowError('REDIS_USERNAME'),
      STRAPI_BASE_URL: ServerConfigurationService.getOrThrowError('STRAPI_BASE_URL'),
      STRAPI_TOKEN_API: ServerConfigurationService.getOrThrowError('STRAPI_TOKEN_API'),
      STRAPI_URL_API: ServerConfigurationService.getOrThrowError('STRAPI_URL_API'),
    };
  }

  private static getOrThrowError(name: string): string {
    const environmentVariable = process.env[name];
    if (!environmentVariable) {
      throw new EnvironmentVariablesException(
        `Variable ${name} missing from environment!`,
      );
    } else {
      return environmentVariable;
    }
  }
}

class EnvironmentVariablesException extends Error {
  constructor(readonly message: string) {
    super(message);
  }
}

export interface EnvironmentVariables {
  readonly POLE_EMPLOI_CONNECT_URL: string;
  readonly POLE_EMPLOI_CONNECT_CLIENT_ID: string;
  readonly POLE_EMPLOI_CONNECT_CLIENT_SECRET: string;
  readonly POLE_EMPLOI_CONNECT_SCOPE: string;
  readonly API_POLE_EMPLOI_BASE_URL: string;
  readonly API_LA_BONNE_ALTERNANCE_BASE_URL: string;
  readonly API_ENGAGEMENT_BASE_URL: string;
  readonly API_ENGAGEMENT_API_KEY_TOKEN: string;
  readonly REDIS_DB: number;
  readonly REDIS_HOST: string;
  readonly REDIS_PASSWORD: string;
  readonly REDIS_PORT: number;
  readonly REDIS_USERNAME: string;
  readonly STRAPI_URL_API: string;
  readonly STRAPI_BASE_URL: string;
  readonly STRAPI_TOKEN_API: string;
  readonly API_GEO_BASE_URL: string;
  readonly API_ADRESSE_BASE_URL: string;
  readonly FRONT_URL: string;
}
