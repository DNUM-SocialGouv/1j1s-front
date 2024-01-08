import {
	ApiTrajectoiresProTokenAgent,
} from '~/server/formations/configuration/api-trajectoires-pro/apiTrajectoiresProTokenAgent';
import { ConfigurationService } from '~/server/services/configuration.service';
import { AuthenticatedHttpClientConfig } from '~/server/services/http/authenticatedHttpClient.service';

export function getApiTrajectoiresProConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
	const authenticationUrl = `${configurationService.getConfiguration().API_TRAJECTOIRES_PRO_URL}inserjeunes/auth/login`;
	const authenticationUsername = configurationService.getConfiguration().API_TRAJECTOIRES_PRO_USERNAME;
	const authenticationPassword = configurationService.getConfiguration().API_TRAJECTOIRES_PRO_PASSWORD;
	
	return ({
		apiName: 'API_TRAJECTOIRES_PRO',
		apiUrl: configurationService.getConfiguration().API_TRAJECTOIRES_PRO_URL,
		tokenAgent: new ApiTrajectoiresProTokenAgent(authenticationUrl, authenticationUsername, authenticationPassword),
	});
}
