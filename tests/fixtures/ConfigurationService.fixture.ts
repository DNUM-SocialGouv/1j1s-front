import { EnvironementVariables } from "../../src/server/services/ServerConfigurationService";

export const configurationServiceFixture: EnvironementVariables = {
  API_POLE_EMPLOI_CLIENT_ID: "fake_client_id",
  API_POLE_EMPLOI_CLIENT_SECRET: "fake_client_secret",
  API_POLE_EMPLOI_SCOPE: "fake_scope",
  REDIS_DB: 0,
  REDIS_HOST: "fake_redis_host",
  REDIS_PASSWORD: "fake_redis_password",
  REDIS_PORT: 6379,
  REDIS_USERNAME: "fake_redis_username",
};
