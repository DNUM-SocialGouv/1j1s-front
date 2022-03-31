import { EnvironementVariables } from "./ServerConfigurationService";

export interface ConfigurationService {
  getConfiguration(): EnvironementVariables;
}
