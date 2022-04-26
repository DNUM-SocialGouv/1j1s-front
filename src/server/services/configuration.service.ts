import { EnvironmentVariables } from '~/server/services/serverConfiguration.service';

export interface ConfigurationService {
  getConfiguration(): EnvironmentVariables;
}
