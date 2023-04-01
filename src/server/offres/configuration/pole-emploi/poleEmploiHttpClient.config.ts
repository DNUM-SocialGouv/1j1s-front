import { PoleEmploiTokenAgent } from '~/server/offres/configuration/pole-emploi/poleEmploiTokenAgent';
import { ConfigurationService } from '~/server/services/configuration.service';
import { AuthenticatedHttpClientConfig } from '~/server/services/http/authenticatedHttpClient.service';

export function getApiPoleEmploiOffresConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
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
}

export function getApiPoleEmploiReferentielsConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
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
}
