import { ConfigurationService } from '~/server/services/configuration.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

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
export type HttpClientWithAuthentificationConfig =
  | HttpClientConfig & Record<'clientId'|'clientSecret'|'connectScope'|'connectUrl', string>
  | HttpClientConfig & { tokenAgent: TokenAgent }

const getApiEngagementConfig = (configurationService: ConfigurationService): HttpClientConfig => {
  return ({
    apiKey: configurationService.getConfiguration().API_ENGAGEMENT_API_KEY_TOKEN,
    apiName: 'API_ENGAGEMENT',
    apiUrl: configurationService.getConfiguration().API_ENGAGEMENT_BASE_URL,
    overrideInterceptor: false,
  });
};

const getApiLaBonneAlternanceConfig = (configurationService: ConfigurationService): HttpClientConfig => {
  return ({
    apiKey: undefined,
    apiName: 'API_LA_BONNE_ALTERNANCE',
    apiUrl: configurationService.getConfiguration().API_LA_BONNE_ALTERNANCE_BASE_URL,
    overrideInterceptor: false,
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

const getApiAdresseConfig = (configurationService: ConfigurationService): HttpClientConfig => {
  return ({
    apiKey: undefined,
    apiName: 'API_ADRESSE_BASE_URL',
    apiUrl: configurationService.getConfiguration().API_ADRESSE_BASE_URL,
    overrideInterceptor: false,
  });
};

const getApiPoleEmploiOffresConfig = (configurationService: ConfigurationService): HttpClientWithAuthentificationConfig => {
  return ({
    apiKey: undefined,
    apiName: 'API_POLE_EMPLOI',
    apiUrl: configurationService.getConfiguration().API_POLE_EMPLOI_OFFRES_URL,
    clientId: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_ID,
    clientSecret: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_SECRET,
    connectScope: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_SCOPE,
    connectUrl: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_URL,
    overrideInterceptor: true,
  });
};

const getApiPoleEmploiReferentielsConfig = (configurationService: ConfigurationService): HttpClientWithAuthentificationConfig => {
  return ({
    apiKey: undefined,
    apiName: 'API_POLE_EMPLOI',
    apiUrl: configurationService.getConfiguration().API_POLE_EMPLOI_REFERENTIEL_URL,
    clientId: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_ID,
    clientSecret: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_SECRET,
    connectScope: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_SCOPE,
    connectUrl: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_URL,
    overrideInterceptor: true,
  });
};

export function buildHttpClientConfigList(configurationService: ConfigurationService) {
  return ({
    adresseClientService: new HttpClientService(getApiAdresseConfig(configurationService)),
    engagementClientService: new HttpClientService(getApiEngagementConfig(configurationService)),
    geoGouvClientService: new HttpClientService(getApiGeoGouvConfig(configurationService)),
    laBonneAlternanceClientService: new HttpClientService(getApiLaBonneAlternanceConfig(configurationService)),
    poleEmploiOffresClientService: new HttpClientServiceWithAuthentification(getApiPoleEmploiOffresConfig(configurationService)),
    poleEmploiReferentielsClientService: new HttpClientServiceWithAuthentification(getApiPoleEmploiReferentielsConfig(configurationService)),
    strapiClientService: new HttpClientService(getApiStrapiConfig(configurationService)),
  });
}
