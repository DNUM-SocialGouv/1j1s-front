import { ConfigurationService } from './configuration.service';
import { EnvironmentVariables } from './serverConfiguration.service';

export class ConfigurationServiceFixture implements ConfigurationService {
	private variables: EnvironmentVariables;

	getConfiguration(): EnvironmentVariables {
		return this.variables;
	}

	constructor(overrides?: Partial<EnvironmentVariables>) {
		this.variables = {
			API_ADRESSE_BASE_URL: 'https://api-adresse.data.gouv.fr/',
			API_ENGAGEMENT_API_KEY_TOKEN: 'API_ENGAGEMENT_API_KEY_TOKEN',
			API_ENGAGEMENT_BASE_URL: 'https://api.api-engagement.beta.gouv.fr/v0/',
			API_ETABLISSEMENTS_PUBLICS: '',
			API_GEO_BASE_URL: 'https://geo.api.gouv.fr/',
			API_LA_BONNE_ALTERNANCE_CALLER: '1jeune-1solution-test',
			API_LA_BONNE_ALTERNANCE_URL: 'https://labonnealternance-recette.beta.gouv.fr/api/',
			API_LES_ENTREPRISES_SENGAGENT_URL: 'https://staging.lesentreprises-sengagent.local',
			API_POLE_EMPLOI_OFFRES_URL: 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres',
			API_POLE_EMPLOI_REFERENTIEL_URL: 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/referentiel',
			API_TRAJECTOIRES_PRO_URL: 'https://trajectoires-pro-recette.apprentissage.beta.gouv.fr/api/',
			ENVIRONMENT: 'test',
			IS_REVIEW_APP: '',
			MAILER_SERVICE_ACTIVE: '',
			MAILER_SERVICE_REDIRECT_TO: '',
			NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: true,
			NEXT_PUBLIC_API_ADRESSE_MINIMUM_QUERY_LENGTH: 3,
			NEXT_PUBLIC_STAGE_SEARCH_ENGINE_API_KEY: 'notTheMasterKey',
			NEXT_PUBLIC_STAGE_SEARCH_ENGINE_BASE_URL: 'http://localhost:7700',
			POLE_EMPLOI_CONNECT_CLIENT_ID: 'POLE_EMPLOI_CONNECT_CLIENT_ID',
			POLE_EMPLOI_CONNECT_CLIENT_SECRET: 'POLE_EMPLOI_CONNECT_CLIENT_SECRET',
			POLE_EMPLOI_CONNECT_SCOPE: 'POLE_EMPLOI_CONNECT_SCOPE',
			POLE_EMPLOI_CONNECT_URL: 'https://entreprise.pole-emploi.fr',
			REDIS_URL: 'REDIS_URL',
			STRAPI_AUTH: '1j1s@gouv.fr:monmotdepasssécurisé',
			STRAPI_URL_API: 'http://localhost:1337/api/',
			TIPIMAIL_API_BASE_URL: '',
			TIPIMAIL_API_KEY: '',
			TIPIMAIL_API_USER: '',
			...overrides,
		};
	}
}
