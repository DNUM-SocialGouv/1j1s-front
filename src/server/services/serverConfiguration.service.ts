import { ConfigurationService } from "~/server/services/configuration.service";

export class ServerConfigurationService implements ConfigurationService {
  getConfiguration(): EnvironmentVariables {
    return {
      API_ADRESSE_BASE_URL: ServerConfigurationService.getOrThrowError(
        "API_ADRESSE_BASE_URL"
      ),
      API_GEO_BASE_URL:
        ServerConfigurationService.getOrThrowError("API_GEO_BASE_URL"),
      API_POLE_EMPLOI_BASE_URL: ServerConfigurationService.getOrThrowError(
        "API_POLE_EMPLOI_BASE_URL"
      ),
      API_POLE_EMPLOI_CLIENT_ID: ServerConfigurationService.getOrThrowError(
        "API_POLE_EMPLOI_CLIENT_ID"
      ),
      API_POLE_EMPLOI_CLIENT_SECRET: ServerConfigurationService.getOrThrowError(
        "API_POLE_EMPLOI_CLIENT_SECRET"
      ),
      API_POLE_EMPLOI_SCOPE: ServerConfigurationService.getOrThrowError(
        "API_POLE_EMPLOI_SCOPE"
      ),
      REDIS_DB: Number(ServerConfigurationService.getOrThrowError("REDIS_DB")),
      REDIS_HOST: ServerConfigurationService.getOrThrowError("REDIS_HOST"),
      REDIS_PASSWORD:
        ServerConfigurationService.getOrThrowError("REDIS_PASSWORD"),
      REDIS_PORT: Number(
        ServerConfigurationService.getOrThrowError("REDIS_PORT")
      ),
      REDIS_USERNAME:
        ServerConfigurationService.getOrThrowError("REDIS_USERNAME"),
      STRAPI_URL_API:
        ServerConfigurationService.getOrThrowError("STRAPI_URL_API"),
      STRAPI_URL_IMAGE:
        ServerConfigurationService.getOrThrowError("STRAPI_URL_IMAGE"),
    };
  }

  private static getOrThrowError(name: string): string {
    if (process.env[name] === undefined) {
      throw new EnvironmentVariablesException(
        `Variable ${name} missing from environment !`
      );
    } else {
      return process.env[name]!;
    }
  }
}

class EnvironmentVariablesException extends Error {
  constructor(readonly message: string) {
    super(message);
  }
}

export interface EnvironmentVariables {
  readonly API_POLE_EMPLOI_CLIENT_ID: string;
  readonly API_POLE_EMPLOI_CLIENT_SECRET: string;
  readonly API_POLE_EMPLOI_SCOPE: string;
  readonly API_POLE_EMPLOI_BASE_URL: string;
  readonly REDIS_DB: number;
  readonly REDIS_HOST: string;
  readonly REDIS_PASSWORD: string;
  readonly REDIS_PORT: number;
  readonly REDIS_USERNAME: string;
  readonly STRAPI_URL_API: string;
  readonly STRAPI_URL_IMAGE: string;
  readonly API_GEO_BASE_URL: string;
  readonly API_ADRESSE_BASE_URL: string;
}
