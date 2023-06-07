import {
	AlternanceDependencies,
	alternancesDependenciesContainer,
} from '~/server/alternances/configuration/dependencies.container';
import {
	getApiLaBonneAlternanceConfig,
} from '~/server/alternances/configuration/la-bonne-alternance/laBonneAlternanceHttpClient.config';
import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { CmsDependencies, cmsDependenciesContainer } from '~/server/cms/configuration/dependencies.container';
import { getApiStrapiConfig, getAuthApiStrapiConfig } from '~/server/cms/configuration/strapi/strapiHttpClient.config';
import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { StrapiErrorManagementService } from '~/server/cms/infra/repositories/strapiErrorManagement.service';
import {
	DemandeDeContactDependencies,
	demandeDeContactDependenciesContainer,
} from '~/server/demande-de-contact/configuration/dependencies.container';
import {
	DemandeDeContactAccompagnementRepository,
} from '~/server/demande-de-contact/infra/repositories/accompagnement/demandeDeContactAccompagnement.repository';
import {
	DemandeDeContactCEJRepository,
} from '~/server/demande-de-contact/infra/repositories/cej/demandeDeContactCEJ.repository';
import {
	DemandeDeContactPOERepository,
} from '~/server/demande-de-contact/infra/repositories/poe/demandeDeContactPOE.repository';
import {
	OffresEmploiDependencies,
	offresEmploiDependenciesContainer,
} from '~/server/emplois/configuration/dependencies.container';
import { ApiPoleEmploiOffreRepository } from '~/server/emplois/infra/repositories/apiPoleEmploiOffre.repository';
import {
	getApiEngagementConfig,
} from '~/server/engagement/configuration/api-engagement/apiEngagementHttpClient.config';
import {
	EngagementDependencies,
	engagementDependenciesContainer,
} from '~/server/engagement/configuration/dependencies.container';
import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import {
	EntrepriseDependencies,
	entreprisesDependenciesContainer,
} from '~/server/entreprises/configuration/dependencies.container';
import {
	getApiRejoindreLaMobilisationConfig,
} from '~/server/entreprises/configuration/rejoindre-la-mobilisation/rejoindreLaMobilisationHttpClient.config';
import { ApiRejoindreLaMobilisationRepository } from '~/server/entreprises/infra/apiRejoindreLaMobilisation.repository';
import {
	ApiRejoindreLaMobilisationErrorManagementService,
} from '~/server/entreprises/infra/apiRejoindreLaMobilisationErrorManagement.service';
import {
	ÉtablissementAccompagnementDependencies,
	établissementAccompagnementDependenciesContainer,
} from '~/server/établissement-accompagnement/configuration/dependencies.container';
import {
	getApiÉtablissementsPublicsConfig,
} from '~/server/établissement-accompagnement/configuration/établissements-publics/établissementPublicHttpClient.config';
import {
	ApiÉtablissementPublicRepository,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';
import {
	getApiTrajectoiresProConfig,
} from '~/server/formations/configuration/api-trajectoires-pro/apiTrajectoiresProHttpClient.config';
import {
	FormationDependencies,
	formationsDependenciesContainer,
} from '~/server/formations/configuration/dependencies.container';
import {
	ApiLaBonneAlternanceFormationRepository,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.repository';
import {
	ApiTrajectoiresProStatistiqueRepository,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.repository';
import {
	jobsEteDependenciesContainer,
	OffresJobEteDependencies,
} from '~/server/jobs-ete/configuration/dependencies.container';
import { ApiPoleEmploiJobEteRepository } from '~/server/jobs-ete/infra/repositories/apiPoleEmploiJobEte.repository';
import {
	jobsÉtudiantsDependenciesContainer,
	OffresJobÉtudiantDependencies,
} from '~/server/jobs-étudiants/configuration/dependencies.container';
import {
	ApiPoleEmploiJobÉtudiantRepository,
} from '~/server/jobs-étudiants/infra/repositories/apiPoleEmploiJobÉtudiant.repository';
import { getApiAdresseConfig } from '~/server/localisations/configuration/adresse/adresseHttpClient.config';
import {
	LocalisationDependencies,
	localisationDependenciesContainer,
} from '~/server/localisations/configuration/dependencies.container';
import { getApiGeoGouvConfig } from '~/server/localisations/configuration/geo/geoHttpClient.config';
import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import {
	ApiAdresseErrorManagementService,
} from '~/server/localisations/infra/repositories/apiAdresseErrorManagement.service';
import { ApiGeoRepository } from '~/server/localisations/infra/repositories/apiGeo.repository';
import { getApiTipimailConfig } from '~/server/mail/configuration/tipimail/tipimailHttpClient.config';
import { TipimailRepository } from '~/server/mail/infra/repositories/tipimail.repository';
import {
	MétierDependencies,
	métiersDependenciesContainer,
} from '~/server/metiers/configuration/dependencies.container';
import { ApiLaBonneAlternanceMétierRepository } from '~/server/metiers/infra/apiLaBonneAlternanceMétier.repository';
import {
	getApiPoleEmploiOffresConfig,
	getApiPoleEmploiReferentielsConfig,
} from '~/server/offres/configuration/pole-emploi/poleEmploiHttpClient.config';
import {
	ApiPoleEmploiOffreErrorManagementServiceGet,
	ApiPoleEmploiOffreErrorManagementServiceSearch,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiErrorManagement.service';
import {
	ApiPoleEmploiRéférentielRepository,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiRéférentiel.repository';
import {
	PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { RobotsDependencies, robotsDependenciesContainer } from '~/server/robots/configuration/dependencies.container';
import { CacheService } from '~/server/services/cache/cache.service';
import { MockedCacheService } from '~/server/services/cache/cacheService.fixture';
import { RedisCacheService } from '~/server/services/cache/redisCache.service';
import { DefaultErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';
import { aLoggerService } from '~/server/services/logger.service.fixture';
import { PinoLoggerService } from '~/server/services/pinoLogger.service';
import { ServerConfigurationService } from '~/server/services/serverConfiguration.service';
import {
	SitemapDependencies,
	sitemapDependenciesContainer,
} from '~/server/sitemap/configuration/dependencies.container';

export type Dependencies = {
	alternanceDependencies: AlternanceDependencies;
	formationDependencies: FormationDependencies;
	métierDependencies: MétierDependencies;
	offreEmploiDependencies: OffresEmploiDependencies;
	cmsDependencies: CmsDependencies;
	engagementDependencies: EngagementDependencies;
	localisationDependencies: LocalisationDependencies;
	demandeDeContactDependencies: DemandeDeContactDependencies;
	entrepriseDependencies: EntrepriseDependencies;
	offreJobEteDependencies: OffresJobEteDependencies;
	offreJobÉtudiantDependencies: OffresJobÉtudiantDependencies
	robotsDependencies: RobotsDependencies;
	sitemapDependencies: SitemapDependencies;
	établissementAccompagnementDependencies: ÉtablissementAccompagnementDependencies;
	loggerService: LoggerService
}

export function dependenciesContainer(): Dependencies {
	const serverConfigurationService = new ServerConfigurationService();
	let cacheService: CacheService;
	let loggerService: LoggerService;

	if (process.env.NODE_ENV === 'test') {
		loggerService = aLoggerService();
	}  else {
		loggerService = new PinoLoggerService(
			serverConfigurationService.getConfiguration().NEXT_PUBLIC_SENTRY_DSN,
			serverConfigurationService.getConfiguration().NEXT_PUBLIC_SENTRY_LOG_LEVEL,
			serverConfigurationService.getConfiguration().NEXT_PUBLIC_SENTRY_ENVIRONMENT,
		);
	}

	if (process.env.NODE_ENV === 'test') {
		cacheService = new MockedCacheService();
	} else {
		const redisUrl = serverConfigurationService.getConfiguration().REDIS_URL;
		cacheService = new RedisCacheService(redisUrl, loggerService);
	}

	const defaultErrorManagementService = new DefaultErrorManagementService(loggerService);

	const strapiAuthenticatedHttpClientService = new AuthenticatedHttpClientService(getAuthApiStrapiConfig(serverConfigurationService), loggerService);
	const strapiPublicHttpClientService = new PublicHttpClientService(getApiStrapiConfig(serverConfigurationService));
	const strapiErrorManagementService = new StrapiErrorManagementService(loggerService);
	const cmsRepository = new StrapiRepository(strapiPublicHttpClientService, strapiAuthenticatedHttpClientService, strapiErrorManagementService);
	const cmsDependencies = cmsDependenciesContainer(cmsRepository, serverConfigurationService);


	const poleEmploiRéférentielsHttpClientService = new AuthenticatedHttpClientService(getApiPoleEmploiReferentielsConfig(serverConfigurationService), loggerService);
	const poleEmploiOffresHttpClientService = new AuthenticatedHttpClientService(getApiPoleEmploiOffresConfig(serverConfigurationService), loggerService);
	const apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiRéférentielsHttpClientService, cacheService);
	const poleEmploiParamètreBuilderService = new PoleEmploiParamètreBuilderService(apiPoleEmploiRéférentielRepository);
	const apiPoleEmploiOffreErreurManagementServiceSearch = new ApiPoleEmploiOffreErrorManagementServiceSearch(loggerService);
	const apiPoleEmploiOffreErreurManagementServiceGet = new ApiPoleEmploiOffreErrorManagementServiceGet(loggerService);
	const apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(poleEmploiOffresHttpClientService, poleEmploiParamètreBuilderService, cacheService, apiPoleEmploiOffreErreurManagementServiceSearch, apiPoleEmploiOffreErreurManagementServiceGet);
	const offreEmploiDependencies = offresEmploiDependenciesContainer(apiPoleEmploiOffreRepository);

	const apiPoleEmploiJobÉtudiantOffreRepository = new ApiPoleEmploiJobÉtudiantRepository(poleEmploiOffresHttpClientService, poleEmploiParamètreBuilderService, cacheService, apiPoleEmploiOffreErreurManagementServiceSearch, apiPoleEmploiOffreErreurManagementServiceGet);
	const offreJobÉtudiantDependencies = jobsÉtudiantsDependenciesContainer(apiPoleEmploiJobÉtudiantOffreRepository);

	const apiPoleEmploiJobEteOffreRepository = new ApiPoleEmploiJobEteRepository(poleEmploiOffresHttpClientService, poleEmploiParamètreBuilderService, cacheService, apiPoleEmploiOffreErreurManagementServiceSearch, apiPoleEmploiOffreErreurManagementServiceGet);
	const offreJobEteDependencies = jobsEteDependenciesContainer(apiPoleEmploiJobEteOffreRepository);

	const laBonneAlternanceClientService = new PublicHttpClientService(getApiLaBonneAlternanceConfig(serverConfigurationService));
	const apiLaBonneAlternanceCaller = serverConfigurationService.getConfiguration().API_LA_BONNE_ALTERNANCE_CALLER;
	const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceClientService, apiLaBonneAlternanceCaller, defaultErrorManagementService);
	const apiLaBonneAlternanceFormationRepository = new ApiLaBonneAlternanceFormationRepository(laBonneAlternanceClientService, apiLaBonneAlternanceCaller, loggerService);
	const apiLaBonneAlternanceMétierRepository = new ApiLaBonneAlternanceMétierRepository(laBonneAlternanceClientService, defaultErrorManagementService);

	const alternanceDependencies = alternancesDependenciesContainer(apiLaBonneAlternanceRepository);

	const trajectoiresProHttpClientService = new PublicHttpClientService(getApiTrajectoiresProConfig(serverConfigurationService));
	const geoHttpClientService = new CachedHttpClientService(getApiGeoGouvConfig(serverConfigurationService));
	const apiGeoLocalisationRepository = new ApiGeoRepository(geoHttpClientService, loggerService);
	const apiTrajectoiresProStatistiqueRepository = new ApiTrajectoiresProStatistiqueRepository(trajectoiresProHttpClientService, apiGeoLocalisationRepository, loggerService);

	const formationDependencies = formationsDependenciesContainer(apiLaBonneAlternanceFormationRepository, apiTrajectoiresProStatistiqueRepository);

	const métierDependencies = métiersDependenciesContainer(apiLaBonneAlternanceMétierRepository);

	const engagementHttpClientService = new PublicHttpClientService(getApiEngagementConfig(serverConfigurationService));
	const apiEngagementRepository = new ApiEngagementRepository(engagementHttpClientService, defaultErrorManagementService);
	const engagementDependencies = engagementDependenciesContainer(apiEngagementRepository);

	const apiAdresseErrorManagementService = new ApiAdresseErrorManagementService(loggerService);
	const adresseHttpClientService = new CachedHttpClientService(getApiAdresseConfig(serverConfigurationService));
	const apiAdresseRepository = new ApiAdresseRepository(adresseHttpClientService, apiAdresseErrorManagementService);
	const localisationDependencies = localisationDependenciesContainer(apiGeoLocalisationRepository, apiAdresseRepository, serverConfigurationService);

	const mailClientService = new PublicHttpClientService(getApiTipimailConfig(serverConfigurationService));
	const mailRepository = new TipimailRepository(
		mailClientService,
		loggerService,
		serverConfigurationService.getConfiguration().MAILER_SERVICE_ACTIVE === '1',
		serverConfigurationService.getConfiguration().MAILER_SERVICE_REDIRECT_TO || undefined,
	);
	const demandeDeContactAccompagnementRepository = new DemandeDeContactAccompagnementRepository(mailRepository);
	const demandeDeContactCEJRepository = new DemandeDeContactCEJRepository(cmsRepository);
	const demandeDeContactPOERepository = new DemandeDeContactPOERepository(cmsRepository);

	const demandeDeContactDependencies = demandeDeContactDependenciesContainer(
		demandeDeContactAccompagnementRepository,
		demandeDeContactCEJRepository,
		demandeDeContactPOERepository,
	);

	const lesEntreprisesSEngagentHttpClientService = new PublicHttpClientService(getApiRejoindreLaMobilisationConfig(serverConfigurationService));
	const apiRejoindreLaMobilisationErrorManagementService = new ApiRejoindreLaMobilisationErrorManagementService(loggerService);
	const apiRejoindreLaMobilisationRepository = new ApiRejoindreLaMobilisationRepository(lesEntreprisesSEngagentHttpClientService, apiRejoindreLaMobilisationErrorManagementService);
	const entrepriseDependencies = entreprisesDependenciesContainer(apiRejoindreLaMobilisationRepository, cmsRepository);

	const etablissementPublicHttpClientService = new PublicHttpClientService(getApiÉtablissementsPublicsConfig(serverConfigurationService));
	const apiEtablissementPublicRepository = new ApiÉtablissementPublicRepository(etablissementPublicHttpClientService, defaultErrorManagementService);
	const établissementAccompagnementDependencies = établissementAccompagnementDependenciesContainer(apiEtablissementPublicRepository);

	const robotsDependencies = robotsDependenciesContainer(serverConfigurationService);

	const sitemapDependencies = sitemapDependenciesContainer(cmsRepository);


	return {
		alternanceDependencies,
		cmsDependencies,
		demandeDeContactDependencies,
		engagementDependencies,
		entrepriseDependencies,
		formationDependencies,
		localisationDependencies,
		loggerService,
		métierDependencies,
		offreEmploiDependencies,
		offreJobEteDependencies,
		offreJobÉtudiantDependencies,
		robotsDependencies,
		sitemapDependencies,
		établissementAccompagnementDependencies,
	};
}
