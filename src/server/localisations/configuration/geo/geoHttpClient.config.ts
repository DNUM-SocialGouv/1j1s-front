import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiGeoGouvConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return {
		apiName: 'API_GEO_GOUV',
		apiUrl: configurationService.getConfiguration().API_GEO_BASE_URL,
	};
}
