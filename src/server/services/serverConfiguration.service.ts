import { ConfigurationService } from '~/server/services/configuration.service';

export class ServerConfigurationService implements ConfigurationService {
	getConfiguration(): EnvironmentVariables {
		return {
			API_ADRESSE_BASE_URL: ServerConfigurationService.getOrThrowError('API_ADRESSE_BASE_URL'),
			API_ENGAGEMENT_API_KEY_TOKEN: ServerConfigurationService.getOrThrowError('API_ENGAGEMENT_API_KEY_TOKEN'),
			API_ENGAGEMENT_BASE_URL: ServerConfigurationService.getOrThrowError('API_ENGAGEMENT_BASE_URL'),
			API_ETABLISSEMENTS_PUBLICS: ServerConfigurationService.getOrThrowError('API_ETABLISSEMENTS_PUBLICS'),
			API_GEO_BASE_URL: ServerConfigurationService.getOrThrowError('API_GEO_BASE_URL'),
			API_LA_BONNE_ALTERNANCE_CALLER: ServerConfigurationService.getOrThrowError('API_LA_BONNE_ALTERNANCE_CALLER'),
			API_LA_BONNE_ALTERNANCE_URL: ServerConfigurationService.getOrThrowError('API_LA_BONNE_ALTERNANCE_URL'),
			API_LES_ENTREPRISES_SENGAGENT_URL: ServerConfigurationService.getOrThrowError('API_LES_ENTREPRISES_SENGAGENT_URL'),
			API_POLE_EMPLOI_OFFRES_URL: ServerConfigurationService.getOrThrowError('API_POLE_EMPLOI_OFFRES_URL'),
			API_POLE_EMPLOI_REFERENTIEL_URL: ServerConfigurationService.getOrThrowError('API_POLE_EMPLOI_REFERENTIEL_URL'),
			API_TRAJECTOIRES_PRO_URL: ServerConfigurationService.getOrThrowError('API_TRAJECTOIRES_PRO_URL'),
			ENVIRONMENT: ServerConfigurationService.getOrDefault('ENVIRONMENT', 'local'),
			IS_REVIEW_APP: ServerConfigurationService.getOrDefault('IS_REVIEW_APP', ''),
			MAILER_SERVICE_ACTIVE: ServerConfigurationService.getOrDefault('MAILER_SERVICE_ACTIVE', '0'),
			MAILER_SERVICE_REDIRECT_TO: ServerConfigurationService.getOrDefault('MAILER_SERVICE_REDIRECT_TO', ''),
			NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: Boolean(Number(ServerConfigurationService.getOrDefault('NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE', '0'))),
			NEXT_PUBLIC_API_ADRESSE_MINIMUM_QUERY_LENGTH: Number(ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_API_ADRESSE_MINIMUM_QUERY_LENGTH')),
			// TODO décider si default value?
			NEXT_PUBLIC_SENTRY_DSN: ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_SENTRY_DSN'),
			
			NEXT_PUBLIC_SENTRY_ENVIRONMENT: ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_SENTRY_ENVIRONMENT'),
			
			NEXT_PUBLIC_SENTRY_LOG_LEVEL: ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_SENTRY_LOG_LEVEL'), 
			NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE: Number(ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_SENTRY_USER_AGENT_BLACKLIST')),
			NEXT_PUBLIC_SENTRY_USER_AGENT_BLACKLIST: ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_SENTRY_USER_AGENT_BLACKLIST'),
			NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY: ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY'),
			NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL: ServerConfigurationService.getOrThrowError('NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL'),
			POLE_EMPLOI_CONNECT_CLIENT_ID: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_CLIENT_ID'),
			POLE_EMPLOI_CONNECT_CLIENT_SECRET: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_CLIENT_SECRET'),
			POLE_EMPLOI_CONNECT_SCOPE: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_SCOPE').replaceAll(',', ' '),
			POLE_EMPLOI_CONNECT_URL: ServerConfigurationService.getOrThrowError('POLE_EMPLOI_CONNECT_URL'),
			REDIS_URL: ServerConfigurationService.getOrThrowError('REDIS_URL'),
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
	readonly NEXT_PUBLIC_API_ADRESSE_MINIMUM_QUERY_LENGTH: number
	readonly NEXT_PUBLIC_SENTRY_LOG_LEVEL: string
	readonly NEXT_PUBLIC_SENTRY_DSN: string
	readonly NEXT_PUBLIC_SENTRY_ENVIRONMENT: string
	readonly NEXT_PUBLIC_SENTRY_USER_AGENT_BLACKLIST: string
	readonly NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE: number
	readonly API_ENGAGEMENT_API_KEY_TOKEN: string
	readonly API_ENGAGEMENT_BASE_URL: string
	readonly API_ETABLISSEMENTS_PUBLICS: string
	readonly API_GEO_BASE_URL: string
	readonly API_LA_BONNE_ALTERNANCE_CALLER: string
	readonly API_LA_BONNE_ALTERNANCE_URL: string
	readonly API_LES_ENTREPRISES_SENGAGENT_URL: string
	readonly API_POLE_EMPLOI_OFFRES_URL: string
	readonly API_POLE_EMPLOI_REFERENTIEL_URL: string
	readonly API_TRAJECTOIRES_PRO_URL: string
	readonly ENVIRONMENT: string
	readonly IS_REVIEW_APP: string
	readonly MAILER_SERVICE_ACTIVE: string
	readonly MAILER_SERVICE_REDIRECT_TO: string
	readonly NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: boolean
	readonly NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY: string
	readonly NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL: string
	readonly POLE_EMPLOI_CONNECT_CLIENT_ID: string
	readonly POLE_EMPLOI_CONNECT_CLIENT_SECRET: string
	readonly POLE_EMPLOI_CONNECT_SCOPE: string
	readonly POLE_EMPLOI_CONNECT_URL: string
	readonly REDIS_URL: string
	readonly STRAPI_AUTH: string
	readonly STRAPI_URL_API: string
	readonly TIPIMAIL_API_BASE_URL: string
	readonly TIPIMAIL_API_KEY: string
	readonly TIPIMAIL_API_USER: string
}
