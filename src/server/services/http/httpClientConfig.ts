import { ConfigurationService } from '~/server/services/configuration.service';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

import { ClientCredentialsTokenAgent } from './ClientCredentialsTokenAgent';
import { StrapiLoginTokenAgent } from './StrapiLoginTokenAgent';

export interface HttpClientConfig {
  apiName: string
  apiUrl: string
  apiKey?: string
  overrideInterceptor?: boolean
  label?: string
}

export interface TokenAgent {
  getToken(): Promise<string>
}
export interface HttpClientWithAuthentificationConfig extends HttpClientConfig {
  tokenAgent: TokenAgent
}

const getApiEngagementConfig = (configurationService: ConfigurationService): HttpClientConfig => {
  return ({
    apiKey: configurationService.getConfiguration().API_ENGAGEMENT_API_KEY_TOKEN,
    apiName: 'API_ENGAGEMENT',
    apiUrl: configurationService.getConfiguration().API_ENGAGEMENT_BASE_URL,
    overrideInterceptor: false,
  });
};

const getAuthApiStrapiConfig = (configurationService: ConfigurationService): HttpClientWithAuthentificationConfig => {
  const [ login, password ] = configurationService.getConfiguration().STRAPI_AUTH.split(':');
  return ({
    apiKey: undefined,
    apiName: 'STRAPI_URL_API',
    apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
    tokenAgent: new StrapiLoginTokenAgent({
      apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
      login,
      password,
    }),
  });
};

const getApiStrapiConfig = (configurationService: ConfigurationService): HttpClientConfig => {
  return ({
    apiKey: undefined,
    apiName: 'STRAPI_URL_API',
    apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
    overrideInterceptor: false,
  });
};

const getApiGeoGouvConfig = (configurationService: ConfigurationService): HttpClientConfig => {
  return ({
    apiKey: undefined,
    apiName: 'API_GEO_GOUV',
    apiUrl: configurationService.getConfiguration().API_GEO_BASE_URL,
    overrideInterceptor: false,
  });
};

const getApiLEEConfig = (configurationService: ConfigurationService): HttpClientConfig => {
  return ({
    apiKey: undefined,
    apiName: 'API_LES_ENTREPRISES_SENGAGENT',
    apiUrl: configurationService.getConfiguration().API_LES_ENTREPRISES_SENGAGENT_URL,
    overrideInterceptor: false,
  });
};

const getApiAdresseConfig = (configurationService: ConfigurationService): HttpClientConfig => {
  return ({
    apiKey: undefined,
    apiName: 'API_ADRESSE_BASE_URL',
    apiUrl: configurationService.getConfiguration().API_ADRESSE_BASE_URL,
    overrideInterceptor: false,
  });
};

const getApiÉtablissementsPublicsConfig = (configurationService: ConfigurationService): HttpClientConfig => {
  return ({
    apiKey: undefined,
    apiName: 'API_ETABLISSEMENTS_PUBLICS',
    apiUrl: configurationService.getConfiguration().API_ETABLISSEMENTS_PUBLICS,
    overrideInterceptor: false,
  });
};

const getApiPoleEmploiOffresConfig = (configurationService: ConfigurationService): HttpClientWithAuthentificationConfig => {
  return ({
    apiName: 'API_POLE_EMPLOI',
    apiUrl: configurationService.getConfiguration().API_POLE_EMPLOI_OFFRES_URL,
    tokenAgent: new ClientCredentialsTokenAgent({
      clientId: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_ID,
      clientSecret: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_SECRET,
      scope: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_SCOPE,
      url: `${configurationService.getConfiguration().POLE_EMPLOI_CONNECT_URL}/connexion/oauth2/access_token?realm=partenaire`,
    }),
  });
};

const getApiPoleEmploiReferentielsConfig = (configurationService: ConfigurationService): HttpClientWithAuthentificationConfig => {
  return ({
    apiName: 'API_POLE_EMPLOI',
    apiUrl: configurationService.getConfiguration().API_POLE_EMPLOI_REFERENTIEL_URL,
    tokenAgent: new ClientCredentialsTokenAgent({
      clientId: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_ID,
      clientSecret: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_SECRET,
      scope: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_SCOPE,
      url: `${configurationService.getConfiguration().POLE_EMPLOI_CONNECT_URL}/connexion/oauth2/access_token?realm=partenaire`,
    }),
  });
};

export function buildHttpClientConfigList(configurationService: ConfigurationService) {
  return {
    adresseClientService: new HttpClientService(getApiAdresseConfig(configurationService)),
    engagementClientService: new HttpClientService(getApiEngagementConfig(configurationService)),
    geoGouvClientService: new HttpClientService(getApiGeoGouvConfig(configurationService)),
    lesEntreprisesSEngagentClientService: new HttpClientService(getApiLEEConfig(configurationService)),
    poleEmploiOffresClientService: new HttpClientServiceWithAuthentification(getApiPoleEmploiOffresConfig(configurationService)),
    poleEmploiReferentielsClientService: new HttpClientServiceWithAuthentification(getApiPoleEmploiReferentielsConfig(configurationService)),
    strapiAuthClientService: new HttpClientServiceWithAuthentification(getAuthApiStrapiConfig(configurationService)),
    strapiClientService: new HttpClientService(getApiStrapiConfig(configurationService)),
    établissementAccompagnementClientService: new HttpClientService(getApiÉtablissementsPublicsConfig(configurationService)),
  };
}
