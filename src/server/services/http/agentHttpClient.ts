import { ConfigurationService } from '~/server/services/configuration.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

export interface AgentHttpClient {
  apiName: string
  apiUrl: string
  apiKey?: string
  overrideInterceptor: boolean
  label?: string
}

export interface PoleEmploiHttpClientConfig extends AgentHttpClient {
  clientId: string
  connectUrl: string
  clientSecret: string
  connectScope: string
}

const AgentApiEngagement = (configurationService: ConfigurationService): AgentHttpClient => {
  return(
    {
      apiKey: configurationService.getConfiguration().API_ENGAGEMENT_API_KEY_TOKEN,
      apiName: 'API_ENGAGEMENT',
      apiUrl: configurationService.getConfiguration().API_ENGAGEMENT_BASE_URL,
      overrideInterceptor: false,
    }
  );
};

const AgentApiLaBonneAlternance = (configurationService: ConfigurationService): AgentHttpClient => {
  return(
    {
      apiKey: undefined,
      apiName: 'API_LA_BONNE_ALTERNANCE',
      apiUrl: configurationService.getConfiguration().API_LA_BONNE_ALTERNANCE_BASE_URL,
      overrideInterceptor: false,
    }
  );
};

const AgentStrapi = (configurationService: ConfigurationService): AgentHttpClient => {
  return(
    {
      apiKey: undefined,
      apiName: 'STRAPI_URL_API',
      apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
      overrideInterceptor: false,
    }
  );
};

const AgentGeoGouv = (configurationService: ConfigurationService): AgentHttpClient => {
  return(
    {
      apiKey: undefined,
      apiName: 'API_GEO_GOUV',
      apiUrl: configurationService.getConfiguration().API_GEO_BASE_URL,
      overrideInterceptor: false,
    }
  );
};

const AgentAdresse = (configurationService: ConfigurationService): AgentHttpClient => {
  return(
    {
      apiKey: undefined,
      apiName: 'API_ADRESSE_BASE_URL',
      apiUrl: configurationService.getConfiguration().API_ADRESSE_BASE_URL,
      overrideInterceptor: false,
    }
  );
};

const AgentPoleEmploi = (configurationService: ConfigurationService): PoleEmploiHttpClientConfig => {
  return(
    {
      apiKey: undefined,
      apiName: 'API_POLE_EMPLOI',
      apiUrl: configurationService.getConfiguration().API_POLE_EMPLOI_BASE_URL,
      clientId: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_ID,
      clientSecret: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_SECRET,
      connectScope: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_SCOPE,
      connectUrl: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_URL,
      overrideInterceptor: true,
    }
  );
};

export function buildHttpClientConfigList(configurationService: ConfigurationService) {
  return ({
    apiAdresse: new HttpClientService(AgentAdresse(configurationService)),
    apiEngagement: new HttpClientService(AgentApiLaBonneAlternance(configurationService)),
    apiGeoGouv: new HttpClientService(AgentGeoGouv(configurationService)),
    apiLaBonneAlternance: new HttpClientService(AgentApiEngagement(configurationService)),
    apiPoleEmploi: new HttpClientServiceWithAuthentification(AgentPoleEmploi(configurationService)),
    apiStrapi: new HttpClientService(AgentStrapi(configurationService)),
  });
}
