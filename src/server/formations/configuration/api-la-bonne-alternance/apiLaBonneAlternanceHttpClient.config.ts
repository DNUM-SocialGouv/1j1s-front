import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiLaBonneAlternanceConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return {
		apiName: 'API_LA_BONNE_ALTERNANCE',
		apiUrl: configurationService.getConfiguration().API_LA_BONNE_ALTERNANCE_URL,
	};
}
