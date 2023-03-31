import { StrapiTokenAgent } from '~/server/cms/infra/repositories/strapiTokenAgent';
import { PoleEmploiTokenAgent } from '~/server/offres/infra/repositories/pole-emploi/poleEmploiTokenAgent';
import { ConfigurationService } from '~/server/services/configuration.service';
import {
	AuthenticatedHttpClientConfig,
	AuthenticatedHttpClientService,
} from '~/server/services/http/authenticatedHttpClient.service';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';
import {
	PublicHttpClientConfig,
	PublicHttpClientService,
} from '~/server/services/http/publicHttpClient.service';

const getApiEngagementConfig = (configurationService: ConfigurationService): PublicHttpClientConfig => {
	return ({
		apiHeaders: { apiKey: configurationService.getConfiguration().API_ENGAGEMENT_API_KEY_TOKEN },
		apiName: 'API_ENGAGEMENT',
		apiUrl: configurationService.getConfiguration().API_ENGAGEMENT_BASE_URL,
	});
};

const getAuthApiStrapiConfig = (configurationService: ConfigurationService): AuthenticatedHttpClientConfig => {
	const [ login, password ] = configurationService.getConfiguration().STRAPI_AUTH.split(':');
	return ({
		apiName: 'STRAPI_URL_API',
		apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
		tokenAgent: new StrapiTokenAgent({
			apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
			login,
			password,
		}),
	});
};

const getApiStrapiConfig = (configurationService: ConfigurationService): PublicHttpClientConfig => {
	return ({
		apiName: 'STRAPI_URL_API',
		apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
	});
};

const getApiGeoGouvConfig = (configurationService: ConfigurationService): PublicHttpClientConfig => {
	return ({
		apiName: 'API_GEO_GOUV',
		apiUrl: configurationService.getConfiguration().API_GEO_BASE_URL,
	});
};

const getApiLEEConfig = (configurationService: ConfigurationService): PublicHttpClientConfig => {
	return ({
		apiName: 'API_LES_ENTREPRISES_SENGAGENT',
		apiUrl: configurationService.getConfiguration().API_LES_ENTREPRISES_SENGAGENT_URL,
	});
};

const getApiAdresseConfig = (configurationService: ConfigurationService): PublicHttpClientConfig => {
	return ({
		apiName: 'API_ADRESSE_BASE_URL',
		apiUrl: configurationService.getConfiguration().API_ADRESSE_BASE_URL,
	});
};

const getApiÉtablissementsPublicsConfig = (configurationService: ConfigurationService): PublicHttpClientConfig => {
	return ({
		apiName: 'API_ETABLISSEMENTS_PUBLICS',
		apiUrl: configurationService.getConfiguration().API_ETABLISSEMENTS_PUBLICS,
	});
};

const getApiTipimailConfig = (configurationService: ConfigurationService): PublicHttpClientConfig => {
	return ({
		apiHeaders: { 'Content-Type': 'application/json',
			'X-Tipimail-ApiKey': configurationService.getConfiguration().TIPIMAIL_API_KEY,
			'X-Tipimail-ApiUser': configurationService.getConfiguration().TIPIMAIL_API_USER,
		},
		apiName: 'API_TIPIMAIL',
		apiUrl: configurationService.getConfiguration().TIPIMAIL_API_BASE_URL,
	});
};

const getApiPoleEmploiOffresConfig = (configurationService: ConfigurationService): AuthenticatedHttpClientConfig => {
	return ({
		apiName: 'API_POLE_EMPLOI',
		apiUrl: configurationService.getConfiguration().API_POLE_EMPLOI_OFFRES_URL,
		tokenAgent: new PoleEmploiTokenAgent({
			clientId: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_ID,
			clientSecret: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_SECRET,
			scope: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_SCOPE,
			url: `${configurationService.getConfiguration().POLE_EMPLOI_CONNECT_URL}/connexion/oauth2/access_token?realm=partenaire`,
		}),
	});
};

const getApiPoleEmploiReferentielsConfig = (configurationService: ConfigurationService): AuthenticatedHttpClientConfig => {
	return ({
		apiName: 'API_POLE_EMPLOI',
		apiUrl: configurationService.getConfiguration().API_POLE_EMPLOI_REFERENTIEL_URL,
		tokenAgent: new PoleEmploiTokenAgent({
			clientId: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_ID,
			clientSecret: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_CLIENT_SECRET,
			scope: configurationService.getConfiguration().POLE_EMPLOI_CONNECT_SCOPE,
			url: `${configurationService.getConfiguration().POLE_EMPLOI_CONNECT_URL}/connexion/oauth2/access_token?realm=partenaire`,
		}),
	});
};

const getApiLaBonneAlternanceConfig = (configurationService: ConfigurationService): PublicHttpClientConfig => {
	return ({
		apiName: 'API_LA_BONNE_ALTERNANCE',
		apiUrl: configurationService.getConfiguration().API_LA_BONNE_ALTERNANCE_URL,
	});
};

const getApiTrajectoiresProConfig = (configurationService: ConfigurationService): PublicHttpClientConfig => {
	return ({
		apiName: 'API_TRAJECTOIRES_PRO',
		apiUrl: configurationService.getConfiguration().API_TRAJECTOIRES_PRO_URL,
	});
};

export function buildHttpClientConfigList(configurationService: ConfigurationService) {
	return {
		adresseClientService: new CachedHttpClientService(getApiAdresseConfig(configurationService)),
		engagementClientService: new PublicHttpClientService(getApiEngagementConfig(configurationService)),
		geoGouvClientService: new CachedHttpClientService(getApiGeoGouvConfig(configurationService)),
		laBonneAlternanceClientService: new PublicHttpClientService(getApiLaBonneAlternanceConfig(configurationService)),
		lesEntreprisesSEngagentClientService: new PublicHttpClientService(getApiLEEConfig(configurationService)),
		mailClientService: new PublicHttpClientService(getApiTipimailConfig(configurationService)),
		poleEmploiOffresClientService: new AuthenticatedHttpClientService(getApiPoleEmploiOffresConfig(configurationService)),
		poleEmploiReferentielsClientService: new AuthenticatedHttpClientService(getApiPoleEmploiReferentielsConfig(configurationService)),
		strapiAuthClientService: new AuthenticatedHttpClientService(getAuthApiStrapiConfig(configurationService)),
		strapiClientService: new PublicHttpClientService(getApiStrapiConfig(configurationService)),
		trajectoiresProClientService: new PublicHttpClientService(getApiTrajectoiresProConfig(configurationService)),
		établissementAccompagnementClientService: new PublicHttpClientService(getApiÉtablissementsPublicsConfig(configurationService)),
	};
}
