import { ConfigurationService } from '~/server/services/configuration.service';
import { EnvironmentVariables } from '~/server/services/serverConfiguration.service';

export class ConfigurationServiceFixture implements ConfigurationService {
  getConfiguration(): EnvironmentVariables {
    return {
      API_ADRESSE_BASE_URL: 'https://api-adresse.data.gouv.fr/',
      API_ENGAGEMENT_API_KEY_TOKEN: 'API_ENGAGEMENT_API_KEY_TOKEN',
      API_ENGAGEMENT_BASE_URL: 'https://api.api-engagement.beta.gouv.fr/v0/',
      API_GEO_BASE_URL: 'https://geo.api.gouv.fr/',
      API_LA_BONNE_ALTERNANCE_BASE_URL: 'https://labonnealternance.apprentissage.beta.gouv.fr/api/V1/',
      API_POLE_EMPLOI_BASE_URL: 'https://api.emploi-store.fr/',
      CONTACT_MAIL_FOR_MA_BONNE_ALTERNANCE: '1j1s@octo.com',
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
      STRAPI_TOKEN_API: '1234',
      STRAPI_URL_API: 'http://localhost:1337/api/',
    };
  }

}
