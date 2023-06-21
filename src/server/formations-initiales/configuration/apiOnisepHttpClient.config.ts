import { ConfigurationService } from '~/server/services/configuration.service';
import { AuthenticatedHttpClientConfig } from '~/server/services/http/authenticatedHttpClient.service';

import { OnisepTokenAgent } from './onisepTokenAgent';

export function getApiOnisepConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
	return {
		apiName: 'API_ONISEP',
		apiUrl: configurationService.getConfiguration().API_ONISEP_BASE_URL,
		tokenAgent: new OnisepTokenAgent(),
	};
}
