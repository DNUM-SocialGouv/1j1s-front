import { ConfigurationService } from '~/server/services/configuration.service';
import { AuthenticatedHttpClientConfig } from '~/server/services/http/authenticatedHttpClient.service';

import { FranceTravailTokenAgent } from './franceTravailTokenAgent';

export function getApiFranceTravailOffresConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
	return ({
		apiName: 'API_FRANCE_TRAVAIL',
		apiUrl: configurationService.getConfiguration().API_FRANCE_TRAVAIL_OFFRES_URL,
		tokenAgent: new FranceTravailTokenAgent({
			clientId: configurationService.getConfiguration().FRANCE_TRAVAIL_CONNECT_CLIENT_ID,
			clientSecret: configurationService.getConfiguration().FRANCE_TRAVAIL_CONNECT_CLIENT_SECRET,
			scope: configurationService.getConfiguration().FRANCE_TRAVAIL_CONNECT_SCOPE,
			url: `${configurationService.getConfiguration().FRANCE_TRAVAIL_CONNECT_URL}/connexion/oauth2/access_token?realm=partenaire`,
		}),
	});
}

export function getApiFranceTravailReferentielsConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
	return ({
		apiName: 'API_FRANCE_TRAVAIL',
		apiUrl: configurationService.getConfiguration().API_FRANCE_TRAVAIL_REFERENTIEL_URL,
		tokenAgent: new FranceTravailTokenAgent({
			clientId: configurationService.getConfiguration().FRANCE_TRAVAIL_CONNECT_CLIENT_ID,
			clientSecret: configurationService.getConfiguration().FRANCE_TRAVAIL_CONNECT_CLIENT_SECRET,
			scope: configurationService.getConfiguration().FRANCE_TRAVAIL_CONNECT_SCOPE,
			url: `${configurationService.getConfiguration().FRANCE_TRAVAIL_CONNECT_URL}/connexion/oauth2/access_token?realm=partenaire`,
		}),
	});
}
