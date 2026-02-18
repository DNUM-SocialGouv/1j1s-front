import {
	ApiTrajectoiresProTokenAgent,
} from '~/server/formations/configuration/api-trajectoires-pro/apiTrajectoiresProTokenAgent';
import { ConfigurationService } from '~/server/services/configuration.service';
import { AuthenticatedHttpClientConfig } from '~/server/services/http/authenticatedHttpClient.service';

export function getApiTrajectoiresProConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
	const authenticationUrl = `${configurationService.getConfiguration().API_TRAJECTOIRES_PRO_URL}/auth/token`;
	const clientId = configurationService.getConfiguration().API_TRAJECTOIRES_PRO_CLIENT_ID;
	const clientSecret = configurationService.getConfiguration().API_TRAJECTOIRES_PRO_CLIENT_SECRET;
	const apiKey = configurationService.getConfiguration().API_TRAJECTOIRES_PRO_API_KEY;

	return ({
		apiName: 'API_TRAJECTOIRES_PRO',
		apiUrl: configurationService.getConfiguration().API_TRAJECTOIRES_PRO_URL,
		tokenAgent: new ApiTrajectoiresProTokenAgent(authenticationUrl, clientId, clientSecret, apiKey),
	});
}
