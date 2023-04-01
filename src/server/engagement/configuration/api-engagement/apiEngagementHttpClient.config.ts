import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiEngagementConfig (configurationService: ConfigurationService): PublicHttpClientConfig {
	return ({
		apiHeaders: { apiKey: configurationService.getConfiguration().API_ENGAGEMENT_API_KEY_TOKEN },
		apiName: 'API_ENGAGEMENT',
		apiUrl: configurationService.getConfiguration().API_ENGAGEMENT_BASE_URL,
	});
}
