import getConfig from "next/config";

import { ConfigurationService } from "./ConfigurationService";

export class ServerConfigurationService implements ConfigurationService {
  getConfiguration() {
    const { serverRuntimeConfig } = getConfig();
    return serverRuntimeConfig;
  }
}
