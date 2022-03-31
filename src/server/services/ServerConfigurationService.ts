import getConfig from "next/config";

import { ConfigurationService } from "./ConfigurationService";

export class ServerConfigurationService implements ConfigurationService {
  getConfiguration() {
    console.log(getConfig());
    const { serverRuntimeConfig } = getConfig();
    return serverRuntimeConfig;
  }
}
