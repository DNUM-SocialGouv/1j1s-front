import { ConfigurationService } from '../../../services/configuration.service';
import { PublicHttpClientConfig } from '../../../services/http/publicHttpClient.service';

export function getApiOnisepPublicConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return {
		apiName: 'API_ONISEP',
		apiUrl: configurationService.getConfiguration().API_ONISEP_BASE_URL,
	};
}
