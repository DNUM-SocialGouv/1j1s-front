import { ConfigurationService } from '~/server/services/configuration.service';
import { EnvironmentVariables } from '~/server/services/serverConfiguration.service';

export class ConfigurationServiceFixture implements ConfigurationService {
  getConfiguration(): EnvironmentVariables {
    return {
      API_ADRESSE_BASE_URL: 'https://api-adresse.data.gouv.fr/',
      API_GEO_BASE_URL: 'https://geo.api.gouv.fr/',
      API_POLE_EMPLOI_BASE_URL: 'https://api.emploi-store.fr/',
      FRONT_URL: 'http://localhost:3000/',
      POLE_EMPLOI_CONNECT_CLIENT_ID: 'POLE_EMPLOI_CONNECT_CLIENT_ID',
      POLE_EMPLOI_CONNECT_CLIENT_SECRET: 'POLE_EMPLOI_CONNECT_CLIENT_SECRET',
      POLE_EMPLOI_CONNECT_SCOPE: 'POLE_EMPLOI_CONNECT_SCOPE',
      POLE_EMPLOI_CONNECT_URL: 'https://entreprise.pole-emploi.fr',
      REDIS_DB: 0,
      REDIS_HOST: '127.0.0.1',
      REDIS_PASSWORD: 'REDIS_PASSWORD',
      REDIS_PORT: 6379,
      REDIS_USERNAME: 'REDIS_USERNAME',
      STRAPI_BASE_URL: 'http://localhost:1337',
      STRAPI_URL_API: 'http://localhost:1337/api/',
    };
  }

}
