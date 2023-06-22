import { ConfigurationService } from '../../../services/configuration.service';
import { AuthenticatedHttpClientConfig } from '../../../services/http/authenticatedHttpClient.service';
import { OnisepTokenAgent } from './onisepTokenAgent';

export function getApiOnisepConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
	const authenticationUrl = `${configurationService.getConfiguration().API_ONISEP_BASE_URL}/login`;
	const authenticationEmail = configurationService.getConfiguration().API_ONISEP_ACCOUNT_EMAIL;
	const authenticationPassword = configurationService.getConfiguration().API_ONISEP_ACCOUNT_PASSWORD;
	return {
		apiName: 'API_ONISEP',
		apiUrl: configurationService.getConfiguration().API_ONISEP_BASE_URL,
		tokenAgent: new OnisepTokenAgent(authenticationUrl, authenticationEmail, authenticationPassword),
	};
}
