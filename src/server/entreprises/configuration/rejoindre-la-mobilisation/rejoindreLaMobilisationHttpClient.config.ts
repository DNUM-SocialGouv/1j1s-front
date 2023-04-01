import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiRejoindreLaMobilisationConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return {
		apiName: 'API_LES_ENTREPRISES_SENGAGENT',
		apiUrl: configurationService.getConfiguration().API_LES_ENTREPRISES_SENGAGENT_URL,
	};
}
