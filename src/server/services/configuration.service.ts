import { EnvironmentVariables } from "./serverConfiguration.service";

export interface ConfigurationService {
  getConfiguration(): EnvironmentVariables;
}
