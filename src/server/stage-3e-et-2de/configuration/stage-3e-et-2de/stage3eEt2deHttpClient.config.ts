import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiImmersionFacileStage3eEt2deConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return ({
		apiHeaders: { authorization: configurationService.getConfiguration().API_IMMERSION_FACILE_STAGE_3EME_API_KEY },
		apiName: 'API_IMMERSION_FACILE_STAGE_3EME',
		apiUrl: configurationService.getConfiguration().API_IMMERSION_FACILE_STAGE_3EME_URL,
	});
}
