import { StrapiTokenAgent } from '~/server/cms/configuration/strapi/strapiTokenAgent';
import { ConfigurationService } from '~/server/services/configuration.service';
import { AuthenticatedHttpClientConfig } from '~/server/services/http/authenticatedHttpClient.service';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export function getAuthApiStrapiConfig(configurationService: ConfigurationService): AuthenticatedHttpClientConfig {
	const [login, password] = configurationService.getConfiguration().STRAPI_AUTH.split(':');
	return {
		apiName: 'API_STRAPI_AUTHENTICATED',
		apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
		tokenAgent: new StrapiTokenAgent({
			apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
			login,
			password,
		}),
	};
}

export function getApiStrapiConfig(configurationService: ConfigurationService): PublicHttpClientConfig {
	return {
		apiName: 'API_STRAPI_PUBLIC',
		apiUrl: configurationService.getConfiguration().STRAPI_URL_API,
	};
}
