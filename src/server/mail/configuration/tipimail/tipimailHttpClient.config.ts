import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiTipimailConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return {
		apiHeaders: {
			'Content-Type': 'application/json',
			'X-Tipimail-ApiKey': configurationService.getConfiguration().TIPIMAIL_API_KEY,
			'X-Tipimail-ApiUser': configurationService.getConfiguration().TIPIMAIL_API_USER,
		},
		apiName: 'API_TIPIMAIL',
		apiUrl: configurationService.getConfiguration().TIPIMAIL_API_BASE_URL,
	};
}
