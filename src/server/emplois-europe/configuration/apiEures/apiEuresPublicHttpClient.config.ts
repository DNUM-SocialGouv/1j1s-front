import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiEuresPublicHttpClientConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return ({
		apiName: 'API_EURES_BASE_URL',
		apiUrl: configurationService.getConfiguration().API_EURES_BASE_URL,
	});
}
