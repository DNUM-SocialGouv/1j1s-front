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
}
