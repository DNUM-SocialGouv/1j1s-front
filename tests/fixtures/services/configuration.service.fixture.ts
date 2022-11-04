import { ConfigurationService } from '~/server/services/configuration.service';
import { EnvironmentVariables } from '~/server/services/serverConfiguration.service';

export class ConfigurationServiceFixture implements ConfigurationService {
  getConfiguration(): EnvironmentVariables {
    return {
      API_ADRESSE_BASE_URL: 'https://api-adresse.data.gouv.fr/',
      API_ENGAGEMENT_API_KEY_TOKEN: 'API_ENGAGEMENT_API_KEY_TOKEN',
      API_ENGAGEMENT_BASE_URL: 'https://api.api-engagement.beta.gouv.fr/v0/',
      API_GEO_BASE_URL: 'https://geo.api.gouv.fr/',
      API_LES_ENTREPRISES_SENGAGENT_URL: 'https://staging.lesentreprises-sengagent.local',
      API_POLE_EMPLOI_OFFRES_URL: 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres',
      API_POLE_EMPLOI_REFERENTIEL_URL: 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/referentiel',
      IS_REVIEW_APP: '',
      NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY: 'notTheMasterKey',
      NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL: 'http://localhost:7700',
      POLE_EMPLOI_CONNECT_CLIENT_ID: 'POLE_EMPLOI_CONNECT_CLIENT_ID',
      POLE_EMPLOI_CONNECT_CLIENT_SECRET: 'POLE_EMPLOI_CONNECT_CLIENT_SECRET',
      POLE_EMPLOI_CONNECT_SCOPE: 'POLE_EMPLOI_CONNECT_SCOPE',
      POLE_EMPLOI_CONNECT_URL: 'https://entreprise.pole-emploi.fr',
      REDIS_DB: 0,
      REDIS_HOST: '127.0.0.1',
      REDIS_PASSWORD: 'REDIS_PASSWORD',
      REDIS_PORT: 6379,
      REDIS_USERNAME: 'REDIS_USERNAME',
      STRAPI_AUTH: '1j1s@gouv.fr:monmotdepasssécurisé',
      STRAPI_URL_API: 'http://localhost:1337/api/',
    };
  }
}
