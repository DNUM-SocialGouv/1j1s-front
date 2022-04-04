import { ConfigurationService } from "./ConfigurationService";

export class ServerConfigurationService implements ConfigurationService {
  getConfiguration(): EnvironementVariables {
    return {
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
    };
  }

  private static getOrThrowError(name: string) {
    if (process.env[name] === undefined) {
      throw new EnvironmentVariablesException(
        `Variable ${name} missing from environment !`
      );
    } else {
      return process.env[name];
    }
  }
}

class EnvironmentVariablesException extends Error {
  constructor(readonly message: string) {
    super(message);
  }
}

export interface EnvironementVariables {
  readonly API_POLE_EMPLOI_CLIENT_ID: string | undefined;
  readonly API_POLE_EMPLOI_CLIENT_SECRET: string | undefined;
  readonly API_POLE_EMPLOI_SCOPE: string | undefined;
  readonly REDIS_DB: number | undefined;
  readonly REDIS_HOST: string | undefined;
  readonly REDIS_PASSWORD: string | undefined;
  readonly REDIS_PORT: number | undefined;
  readonly REDIS_USERNAME: string | undefined;
}
