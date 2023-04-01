import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiAdresseConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return {
		apiName: 'API_ADRESSE_BASE_URL',
		apiUrl: configurationService.getConfiguration().API_ADRESSE_BASE_URL,
	};
}
