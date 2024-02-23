import { ConfigurationService } from '~/server/services/configuration.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getApiEtablissementPublicConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return ({
		apiName: 'API_ETABLISSEMENTS_PUBLICS',
		apiUrl: configurationService.getConfiguration().API_ETABLISSEMENTS_PUBLICS,
	});
}
