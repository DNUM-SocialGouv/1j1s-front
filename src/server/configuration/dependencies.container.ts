import {
	AlternanceDependencies,
	alternancesDependenciesContainer,
	OffresAlternanceDependencies,
	offresAlternancesDependenciesContainer,
} from '~/server/alternances/configuration/dependencies.container';
import {
	getApiLaBonneAlternanceConfig,
} from '~/server/alternances/configuration/la-bonne-alternance/laBonneAlternanceHttpClient.config';
import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import {
	ApiPoleEmploiAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiPoleEmploiAlternance.repository';
import { CmsDependencies, cmsDependenciesContainer } from '~/server/cms/configuration/dependencies.container';
import { getApiStrapiConfig, getAuthApiStrapiConfig } from '~/server/cms/configuration/strapi/strapiHttpClient.config';
import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
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
	DemandeDeContactEntrepriseRepository,
} from '~/server/demande-de-contact/infra/repositories/entreprise/demandeDeContactEntreprise.repository';
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
	StrapiRejoindreLaMobilisationRepository,
} from '~/server/entreprises/infra/strapiRejoindreLaMobilisation.repository';
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
	ApiPoleEmploiRéférentielRepository,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiRéférentiel.repository';
import {
	PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { RobotsDependencies, robotsDependenciesContainer } from '~/server/robots/configuration/dependencies.container';
import { CacheService } from '~/server/services/cache/cache.service';
import { MockedCacheService } from '~/server/services/cache/cacheService.fixture';
import { RedisCacheService } from '~/server/services/cache/redisCache.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
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
	offreJobÉtudiantDependencies: OffresJobÉtudiantDependencies
	offreAlternanceDependencies: OffresAlternanceDependencies;
	robotsDependencies: RobotsDependencies;
	sitemapDependencies: SitemapDependencies;
	établissementAccompagnementDependencies: ÉtablissementAccompagnementDependencies;
}

export function dependenciesContainer(): Dependencies {
	const serverConfigurationService = new ServerConfigurationService();
	let cacheService: CacheService;

	if (process.env.NODE_ENV === 'test') {
		cacheService = new MockedCacheService();
	} else {
		const redisUrl = serverConfigurationService.getConfiguration().REDIS_URL;
		cacheService = new RedisCacheService(redisUrl);
	}
	
	const strapiAuthenticatedHttpClientService = new AuthenticatedHttpClientService(getAuthApiStrapiConfig(serverConfigurationService));
	const strapiPublicHttpClientService = new PublicHttpClientService(getApiStrapiConfig(serverConfigurationService));
	const cmsRepository = new StrapiRepository(strapiPublicHttpClientService, strapiAuthenticatedHttpClientService);
	const cmsDependencies = cmsDependenciesContainer(cmsRepository, serverConfigurationService);


	const poleEmploiRéférentielsHttpClientService = new AuthenticatedHttpClientService(getApiPoleEmploiReferentielsConfig(serverConfigurationService));
	const poleEmploiOffresHttpClientService = new AuthenticatedHttpClientService(getApiPoleEmploiOffresConfig(serverConfigurationService));
	const apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiRéférentielsHttpClientService, cacheService);
	const poleEmploiParamètreBuilderService = new PoleEmploiParamètreBuilderService(apiPoleEmploiRéférentielRepository);
	const apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(poleEmploiOffresHttpClientService, poleEmploiParamètreBuilderService, cacheService);
	const offreEmploiDependencies = offresEmploiDependenciesContainer(apiPoleEmploiOffreRepository);

	const apiPoleEmploiJobÉtudiantOffreRepository = new ApiPoleEmploiJobÉtudiantRepository(poleEmploiOffresHttpClientService, poleEmploiParamètreBuilderService, cacheService);
	const offreJobÉtudiantDependencies = jobsÉtudiantsDependenciesContainer(apiPoleEmploiJobÉtudiantOffreRepository);

	const laBonneAlternanceClientService = new PublicHttpClientService(getApiLaBonneAlternanceConfig(serverConfigurationService));
	const apiPoleEmploiAlternanceRepository = new ApiPoleEmploiAlternanceRepository(poleEmploiOffresHttpClientService, poleEmploiParamètreBuilderService, cacheService);
	const apiLaBonneAlternanceCaller = serverConfigurationService.getConfiguration().API_LA_BONNE_ALTERNANCE_CALLER;
	const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceClientService, apiLaBonneAlternanceCaller);
	const apiLaBonneAlternanceFormationRepository = new ApiLaBonneAlternanceFormationRepository(laBonneAlternanceClientService, apiLaBonneAlternanceCaller);
	const apiLaBonneAlternanceMétierRepository = new ApiLaBonneAlternanceMétierRepository(laBonneAlternanceClientService);

	const offreAlternanceDependencies = offresAlternancesDependenciesContainer(apiPoleEmploiAlternanceRepository);

	const alternanceDependencies = alternancesDependenciesContainer(apiLaBonneAlternanceRepository);

	const trajectoiresProHttpClientService = new PublicHttpClientService(getApiTrajectoiresProConfig(serverConfigurationService));
	const geoHttpClientService = new CachedHttpClientService(getApiGeoGouvConfig(serverConfigurationService));
	const apiGeoLocalisationRepository = new ApiGeoRepository(geoHttpClientService);
	const apiTrajectoiresProStatistiqueRepository = new ApiTrajectoiresProStatistiqueRepository(trajectoiresProHttpClientService, apiGeoLocalisationRepository);

	const formationDependencies = formationsDependenciesContainer(apiLaBonneAlternanceFormationRepository, apiTrajectoiresProStatistiqueRepository);

	const métierDependencies = métiersDependenciesContainer(apiLaBonneAlternanceMétierRepository);

	const engagementHttpClientService = new PublicHttpClientService(getApiEngagementConfig(serverConfigurationService));
	const apiEngagementRepository = new ApiEngagementRepository(engagementHttpClientService);
	const engagementDependencies = engagementDependenciesContainer(apiEngagementRepository);

	const adresseHttpClientService = new CachedHttpClientService(getApiAdresseConfig(serverConfigurationService));
	const apiAdresseRepository = new ApiAdresseRepository(adresseHttpClientService);
	const localisationDependencies = localisationDependenciesContainer(apiGeoLocalisationRepository, apiAdresseRepository, serverConfigurationService);

	const mailClientService = new PublicHttpClientService(getApiTipimailConfig(serverConfigurationService));
	const mailRepository = new TipimailRepository(
		mailClientService,
		serverConfigurationService.getConfiguration().MAILER_SERVICE_ACTIVE === '1',
		serverConfigurationService.getConfiguration().MAILER_SERVICE_REDIRECT_TO || undefined,
	);
	const demandeDeContactAccompagnementRepository = new DemandeDeContactAccompagnementRepository(mailRepository);
	const demandeDeContactCEJRepository = new DemandeDeContactCEJRepository(cmsRepository);
	const demandeDeContactEntrepriseRepository = new DemandeDeContactEntrepriseRepository(cmsRepository);
	const demandeDeContactPOERepository = new DemandeDeContactPOERepository(cmsRepository);

	const demandeDeContactDependencies = demandeDeContactDependenciesContainer(
		demandeDeContactAccompagnementRepository,
		demandeDeContactCEJRepository,
		demandeDeContactEntrepriseRepository,
		demandeDeContactPOERepository,
	);

	const lesEntreprisesSEngagentHttpClientService = new PublicHttpClientService(getApiRejoindreLaMobilisationConfig(serverConfigurationService));
	const apiRejoindreLaMobilisationRepository = new ApiRejoindreLaMobilisationRepository(lesEntreprisesSEngagentHttpClientService);
	const strapiRejoindreLaMobilisationRepository = new StrapiRejoindreLaMobilisationRepository(strapiAuthenticatedHttpClientService);
	const entrepriseDependencies = entreprisesDependenciesContainer(apiRejoindreLaMobilisationRepository, strapiRejoindreLaMobilisationRepository);

	const établissementPublicHttpClientService = new PublicHttpClientService(getApiÉtablissementsPublicsConfig(serverConfigurationService));
	const apiÉtablissementPublicRepository = new ApiÉtablissementPublicRepository(établissementPublicHttpClientService);
	const établissementAccompagnementDependencies = établissementAccompagnementDependenciesContainer(apiÉtablissementPublicRepository);

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
		métierDependencies,
		offreAlternanceDependencies,
		offreEmploiDependencies,
		offreJobÉtudiantDependencies,
		robotsDependencies,
		sitemapDependencies,
		établissementAccompagnementDependencies,
	};
};
