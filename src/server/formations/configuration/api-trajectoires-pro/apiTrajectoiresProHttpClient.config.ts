import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiTrajectoiresProConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return ({
		apiName: 'API_TRAJECTOIRES_PRO',
		apiUrl: configurationService.getConfiguration().API_TRAJECTOIRES_PRO_URL,
	});
}
