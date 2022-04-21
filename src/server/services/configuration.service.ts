import { EnvironementVariables } from "./serverConfiguration.service";

export interface ConfigurationService {
  getConfiguration(): EnvironementVariables;
}
