import { ConfigurationService } from '~/server/services/configuration.service';

export class ServerConfigurationService implements ConfigurationService {
	getConfiguration(): EnvironmentVariables {
		return {
			API_ADRESSE_BASE_URL: ServerConfigurationService.getOrThrowError('API_ADRESSE_BASE_URL'),
			API_ENGAGEMENT_API_KEY_TOKEN: ServerConfigurationService.getOrThrowError('API_ENGAGEMENT_API_KEY_TOKEN'),
			API_ENGAGEMENT_BASE_URL: ServerConfigurationService.getOrThrowError('API_ENGAGEMENT_BASE_URL'),
			API_ETABLISSEMENTS_PUBLICS: ServerConfigurationService.getOrThrowError('API_ETABLISSEMENTS_PUBLICS'),
			API_GEO_BASE_URL: ServerConfigurationService.getOrThrowError('API_GEO_BASE_URL'),
			API_LES_ENTREPRISES_SENGAGENT_URL: ServerConfigurationService.getOrThrowError('API_LES_ENTREPRISES_SENGAGENT_URL'),
			API_POLE_EMPLOI_OFFRES_URL: ServerConfigurationService.getOrThrowError('API_POLE_EMPLOI_OFFRES_URL'),
			API_POLE_EMPLOI_REFERENTIEL_URL: ServerConfigurationService.getOrThrowError('API_POLE_EMPLOI_REFERENTIEL_URL'),
			IS_REVIEW_APP: ServerConfigurationService.getOrDefault('IS_REVIEW_APP', ''),
			MAILER_SERVICE_ACTIVE: ServerConfigurationService.getOrDefault('MAILER_SERVICE_ACTIVE', '0'),
			MAILER_SERVICE_REDIRECT_TO: ServerConfigurationService.getOrDefault('MAILER_SERVICE_REDIRECT_TO', ''),
			NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY: ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY'),
			NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL: ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL'),
			POLE_EMPLOI_CONNECT_CLIENT_ID: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_CLIENT_ID'),
			POLE_EMPLOI_CONNECT_CLIENT_SECRET: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_CLIENT_SECRET'),
			POLE_EMPLOI_CONNECT_SCOPE: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_SCOPE').replaceAll(',', ' '),
			POLE_EMPLOI_CONNECT_URL: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_URL'),
			REDIS_DB: Number(ServerConfigurationService.getOrThrowError('REDIS_DB')),
			REDIS_HOST: ServerConfigurationService.getOrThrowError('REDIS_HOST'),
			REDIS_PASSWORD: ServerConfigurationService.getOrThrowError('REDIS_PASSWORD'),
			REDIS_PORT: Number(ServerConfigurationService.getOrThrowError('REDIS_PORT')),
			REDIS_USERNAME: ServerConfigurationService.getOrThrowError('REDIS_USERNAME'),
			STRAPI_AUTH: ServerConfigurationService.matchOrThrowError('STRAPI_AUTH', /^(.+):(.+)$/),
			STRAPI_URL_API: ServerConfigurationService.getOrThrowError('STRAPI_URL_API'),
			TIPIMAIL_API_BASE_URL: ServerConfigurationService.getOrThrowError('TIPIMAIL_API_BASE_URL'),
			TIPIMAIL_API_KEY: ServerConfigurationService.getOrThrowError('TIPIMAIL_API_KEY'),
			TIPIMAIL_API_USER: ServerConfigurationService.getOrThrowError('TIPIMAIL_API_USER'),
		};
	}

	private static getOrThrowError(name: string): string {
		const environmentVariable = process.env[name];
		if (!environmentVariable) {
			throw new EnvironmentVariablesException(
				`Variable ${name} missing from environment!`,
			);
		} else {
			return environmentVariable;
		}
	}

	private static matchOrThrowError(name: string, match: RegExp): string {
		const value = ServerConfigurationService.getOrThrowError(name);
		if (!match.test(value)) {
			throw new EnvironmentVariablesException(`Variable ${name} must match ${match}`);
		}
		return value;
	}

	private static getOrDefault(name: string, defaultValue: string): string {
		const environmentVariable = process.env[name];
		return environmentVariable || defaultValue;
	}
}

class EnvironmentVariablesException extends Error {
	constructor(readonly message: string) {
		super(message);
	}
}

export interface EnvironmentVariables {
  readonly API_ADRESSE_BASE_URL: string
  readonly API_ENGAGEMENT_API_KEY_TOKEN: string
  readonly API_ENGAGEMENT_BASE_URL: string
  readonly API_ETABLISSEMENTS_PUBLICS: string
  readonly API_GEO_BASE_URL: string
  readonly API_LES_ENTREPRISES_SENGAGENT_URL: string
  readonly API_POLE_EMPLOI_OFFRES_URL: string
  readonly API_POLE_EMPLOI_REFERENTIEL_URL: string
  readonly IS_REVIEW_APP: string
  readonly MAILER_SERVICE_ACTIVE: string
  readonly MAILER_SERVICE_REDIRECT_TO: string
  readonly NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY: string
  readonly NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL: string
  readonly POLE_EMPLOI_CONNECT_CLIENT_ID: string
  readonly POLE_EMPLOI_CONNECT_CLIENT_SECRET: string
  readonly POLE_EMPLOI_CONNECT_SCOPE: string
  readonly POLE_EMPLOI_CONNECT_URL: string
  readonly REDIS_DB: number
  readonly REDIS_HOST: string
  readonly REDIS_PASSWORD: string
  readonly REDIS_PORT: number
  readonly REDIS_USERNAME: string
  readonly STRAPI_AUTH: string
  readonly STRAPI_URL_API: string
  readonly TIPIMAIL_API_BASE_URL: string
  readonly TIPIMAIL_API_KEY: string
  readonly TIPIMAIL_API_USER: string
}
