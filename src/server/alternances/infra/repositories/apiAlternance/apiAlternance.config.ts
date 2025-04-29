import { ConfigurationService } from '~/server/services/configuration.service';
import { AuthenticatedHttpClientConfig, TokenAgent } from '~/server/services/http/authenticatedHttpClient.service';

export function getApiAlternanceConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
	return {
		apiName: 'API_ALTERNANCE',
		apiUrl: configurationService.getConfiguration().API_ALTERNANCE_URL,
		tokenAgent: new ApiAlternanceTokenAgent(configurationService.getConfiguration().API_ALTERNANCE_TOKEN),
	};
}

export class ApiAlternanceTokenAgent implements TokenAgent {
	constructor(private readonly token: string) {}
	async getToken() {
		return this.token;
	}
}
