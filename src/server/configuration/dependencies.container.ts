import {
	ApiPoleEmploiAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiPoleEmploiAlternance.repository';
import { ConsulterOffreAlternanceUseCase } from '~/server/alternances/useCases/consulterOffreAlternance.useCase';
import { RechercherAlternanceUseCase } from '~/server/alternances/useCases/rechercherAlternance.useCase';
import { CmsDependencies, cmsDependenciesContainer } from '~/server/cms/configuration/cmsDependencies.container';
import { StrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository';
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
	EnvoyerDemandeDeContactAccompagnementUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactAccompagnement.usecase';
import {
	EnvoyerDemandeDeContactCEJUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import {
	EnvoyerDemandeDeContactEntrepriseUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactEntreprise.usecase';
import {
	EnvoyerDemandeDeContactPOEUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactPOE.usecase';
import { ApiPoleEmploiOffreRepository } from '~/server/emplois/infra/repositories/apiPoleEmploiOffre.repository';
import { ConsulterOffreEmploiUseCase } from '~/server/emplois/useCases/consulterOffreEmploi.useCase';
import { RechercherOffreEmploiUseCase } from '~/server/emplois/useCases/rechercherOffreEmploi.useCase';
import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import { ConsulterMissionEngagementUseCase } from '~/server/engagement/useCases/consulterMissionEngagement.useCase';
import { RechercherMissionEngagementUseCase } from '~/server/engagement/useCases/rechercherMissionEngagement.useCase';
import { ApiRejoindreLaMobilisationRepository } from '~/server/entreprises/infra/apiRejoindreLaMobilisation.repository';
import {
	StrapiRejoindreLaMobilisationRepository,
} from '~/server/entreprises/infra/strapiRejoindreLaMobilisation.repository';
import { LesEntreprisesSEngagentUseCase } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';
import { ApiÉtablissementPublicRepository } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';
import { RechercherÉtablissementAccompagnementUseCase } from '~/server/établissement-accompagnement/useCase/rechercherÉtablissementAccompagnement.useCase';
import {
	ApiPoleEmploiJobÉtudiantRepository,
} from '~/server/jobs-étudiants/infra/repositories/apiPoleEmploiJobÉtudiant.repository';
import { ConsulterOffreJobÉtudiantUseCase } from '~/server/jobs-étudiants/useCases/consulterOffreJobÉtudiantUseCase';
import { RechercherOffreJobÉtudiantUseCase } from '~/server/jobs-étudiants/useCases/rechercherOffreJobÉtudiantUseCase';
import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { RechercherCommuneUseCase } from '~/server/localisations/useCases/rechercherCommune.useCase';
import { RechercherLocalisationUseCase } from '~/server/localisations/useCases/rechercherLocalisation.useCase';
import {
	TipimailRepository,
} from '~/server/mail/infra/repositories/tipimail.repository';
import {
	ApiPoleEmploiRéférentielRepository,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiRéférentiel.repository';
import {
	PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { CacheService } from '~/server/services/cache/cache.service';
import { MockedCacheService } from '~/server/services/cache/cacheService.fixture';
import { RedisCacheService } from '~/server/services/cache/redisCache.service';
import { buildHttpClientConfigList } from '~/server/services/http/httpClientConfig';
import { ServerConfigurationService } from '~/server/services/serverConfiguration.service';

export type Dependencies = {
  offreEmploiDependencies: OffresEmploiDependencies;
  cmsDependencies: CmsDependencies;
  engagementDependencies: EngagementDependencies;
  localisationDependencies: LocalisationDependencies;
  demandeDeContactDependencies: DemandeDeContactDependencies
  entrepriseDependencies: EntrepriseDependencies
  offreJobÉtudiantDependencies: OffresJobÉtudiantDependencies
  offreAlternanceDependencies: OffresAlternanceDependencies
  établissementAccompagnementDependencies: ÉtablissementAccompagnementDependencies
};

export interface OffresEmploiDependencies {
  consulterOffreEmploi: ConsulterOffreEmploiUseCase
  rechercherOffreEmploi: RechercherOffreEmploiUseCase
}

export interface OffresJobÉtudiantDependencies {
  consulterOffreJobÉtudiant: ConsulterOffreJobÉtudiantUseCase
  rechercherOffreJobÉtudiant: RechercherOffreJobÉtudiantUseCase
}

export interface OffresAlternanceDependencies {
  consulterOffreAlternance: ConsulterOffreAlternanceUseCase
  rechercherOffreAlternance: RechercherAlternanceUseCase
}

export interface EngagementDependencies {
  rechercherMissionEngagement: RechercherMissionEngagementUseCase;
  consulterMissionEngagement: ConsulterMissionEngagementUseCase;
}

export interface LocalisationDependencies {
  listeLocalisation: RechercherLocalisationUseCase;
  rechercherCommune: RechercherCommuneUseCase;
}

export interface DemandeDeContactDependencies {
  envoyerDemandeDeContactCEJUseCase: EnvoyerDemandeDeContactCEJUseCase
  envoyerDemandeDeContactEntrepriseUseCase: EnvoyerDemandeDeContactEntrepriseUseCase
  envoyerDemandeDeContactPOEUseCase: EnvoyerDemandeDeContactPOEUseCase
  envoyerDemandeDeContactAccompagnementUseCase: EnvoyerDemandeDeContactAccompagnementUseCase
}

export interface EntrepriseDependencies {
  lesEntreprisesSEngagentUseCase: LesEntreprisesSEngagentUseCase
}

export interface ÉtablissementAccompagnementDependencies {
  rechercherÉtablissementAccompagnementUseCase: RechercherÉtablissementAccompagnementUseCase
}

export const dependenciesContainer = (): Dependencies => {
	const serverConfigurationService = new ServerConfigurationService();
	let cacheService: CacheService;
	if(process.env.NODE_ENV === 'test') {
		cacheService = new MockedCacheService();
	} else {
		cacheService  = new RedisCacheService(serverConfigurationService);
	}

	const {
		engagementClientService,
		lesEntreprisesSEngagentClientService,
		poleEmploiOffresClientService,
		poleEmploiReferentielsClientService,
		strapiAuthClientService,
		strapiClientService,
		adresseClientService,
		geoGouvClientService,
		établissementAccompagnementClientService,
		mailClientService,
	} = buildHttpClientConfigList(serverConfigurationService);

	const cmsRepository = new StrapiCmsRepository(strapiClientService, strapiAuthClientService);
	const cmsDependencies = cmsDependenciesContainer(cmsRepository, serverConfigurationService);

	const isApiEmploiFeatureEnabled = Boolean(serverConfigurationService.getConfiguration().API_POLE_EMPLOI_FEATURE === '1');

	const apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiReferentielsClientService, cacheService);
	const poleEmploiParamètreBuilderService = new PoleEmploiParamètreBuilderService(apiPoleEmploiRéférentielRepository);
	const apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(poleEmploiOffresClientService, poleEmploiParamètreBuilderService, cacheService, isApiEmploiFeatureEnabled);
	const offreEmploiDependencies: OffresEmploiDependencies = {
		consulterOffreEmploi: new ConsulterOffreEmploiUseCase(apiPoleEmploiOffreRepository),
		rechercherOffreEmploi: new RechercherOffreEmploiUseCase(apiPoleEmploiOffreRepository),
	};

	const apiPoleEmploiJobÉtudiantOffreRepository = new ApiPoleEmploiJobÉtudiantRepository(poleEmploiOffresClientService, poleEmploiParamètreBuilderService, cacheService, isApiEmploiFeatureEnabled);
	const offreJobÉtudiantDependencies: OffresJobÉtudiantDependencies = {
		consulterOffreJobÉtudiant: new ConsulterOffreJobÉtudiantUseCase(apiPoleEmploiJobÉtudiantOffreRepository),
		rechercherOffreJobÉtudiant: new RechercherOffreJobÉtudiantUseCase(apiPoleEmploiJobÉtudiantOffreRepository),
	};

	const apiPoleEmploiAlternanceRepository = new ApiPoleEmploiAlternanceRepository(poleEmploiOffresClientService, poleEmploiParamètreBuilderService, cacheService, isApiEmploiFeatureEnabled);
	const offreAlternanceDependencies: OffresAlternanceDependencies = {
		consulterOffreAlternance: new ConsulterOffreAlternanceUseCase(apiPoleEmploiAlternanceRepository),
		rechercherOffreAlternance: new RechercherAlternanceUseCase(apiPoleEmploiAlternanceRepository),
	};

	const apiEngagementRepository = new ApiEngagementRepository(engagementClientService);
	const engagementDependencies: EngagementDependencies = {
		consulterMissionEngagement: new ConsulterMissionEngagementUseCase(apiEngagementRepository),
		rechercherMissionEngagement: new RechercherMissionEngagementUseCase(apiEngagementRepository),
	};

	const apiAdresseRepository = new ApiAdresseRepository(adresseClientService);
	const apiGeoLocalisationRepository = new ApiGeoLocalisationRepository(geoGouvClientService);
	const localisationDependencies: LocalisationDependencies = {
		listeLocalisation: new RechercherLocalisationUseCase(apiGeoLocalisationRepository, apiAdresseRepository),
		rechercherCommune: new RechercherCommuneUseCase(apiAdresseRepository),
	};

	const mailRepository = new TipimailRepository(
		mailClientService,
		serverConfigurationService.getConfiguration().MAILER_SERVICE_ACTIVE === '1',
		serverConfigurationService.getConfiguration().MAILER_SERVICE_REDIRECT_TO || undefined,
	);
	const demandeDeContactAccompagnementRepository = new DemandeDeContactAccompagnementRepository(mailRepository);
	const demandeDeContactCEJRepository = new DemandeDeContactCEJRepository(cmsRepository);
	const demandeDeContactEntrepriseRepository = new DemandeDeContactEntrepriseRepository(cmsRepository);
	const demandeDeContactPOERepository = new DemandeDeContactPOERepository(cmsRepository);

	const demandeDeContactDependencies: DemandeDeContactDependencies = {
		envoyerDemandeDeContactAccompagnementUseCase: new EnvoyerDemandeDeContactAccompagnementUseCase(demandeDeContactAccompagnementRepository),
		envoyerDemandeDeContactCEJUseCase: new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactCEJRepository),
		envoyerDemandeDeContactEntrepriseUseCase: new EnvoyerDemandeDeContactEntrepriseUseCase(demandeDeContactEntrepriseRepository),
		envoyerDemandeDeContactPOEUseCase: new EnvoyerDemandeDeContactPOEUseCase(demandeDeContactPOERepository),
	};

	const apiRejoindreLaMobilisationRepository = new ApiRejoindreLaMobilisationRepository(lesEntreprisesSEngagentClientService);
	const strapiRejoindreLaMobilisationRepository = new StrapiRejoindreLaMobilisationRepository(strapiAuthClientService);
	const entrepriseDependencies: EntrepriseDependencies = {
		lesEntreprisesSEngagentUseCase: new LesEntreprisesSEngagentUseCase(apiRejoindreLaMobilisationRepository, strapiRejoindreLaMobilisationRepository),
	};

	const apiÉtablissementPublicRepository = new ApiÉtablissementPublicRepository(établissementAccompagnementClientService);
	const établissementAccompagnementDependencies: ÉtablissementAccompagnementDependencies = {
		rechercherÉtablissementAccompagnementUseCase: new RechercherÉtablissementAccompagnementUseCase(apiÉtablissementPublicRepository),
	};

	return {
		cmsDependencies,
		demandeDeContactDependencies,
		engagementDependencies,
		entrepriseDependencies,
		localisationDependencies,
		offreAlternanceDependencies,
		offreEmploiDependencies,
		offreJobÉtudiantDependencies,
		établissementAccompagnementDependencies,
	};
};
