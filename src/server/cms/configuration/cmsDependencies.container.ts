import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { ConsulterAnnonceLogementUseCase } from '~/server/cms/useCases/consulterAnnonceLogement.useCase';
import { ConsulterArticleUseCase } from '~/server/cms/useCases/consulterArticle.useCase';
import { ConsulterFicheMetierUseCase } from '~/server/cms/useCases/consulterFicheMetier.useCase';
import { ConsulterMentionObligatoireUseCase } from '~/server/cms/useCases/consulterMentionObligatoireUseCase';
import { ConsulterOffreStageUseCase } from '~/server/cms/useCases/consulterOffreStage.useCase';
import { enregistrerOffreDeStageUseCase } from '~/server/cms/useCases/enregistrerOffreDeStage.useCase';
import { ListerNomMétierFicheMétierUseCase } from '~/server/cms/useCases/listerNomMétierFicheMétier.useCase';
import { ListerQuestionsFAQUseCase } from '~/server/cms/useCases/listerQuestionsFAQUseCase';
import { ListerServicesJeunesUseCase } from '~/server/cms/useCases/listerServicesJeunesUseCase';
import { RécupererActualitesUseCase } from '~/server/cms/useCases/récupererActualitesUseCase';
import { RécupérerMesuresEmployeursUseCase } from '~/server/cms/useCases/récupérerMesuresEmployeursUseCase';
import { ConfigurationService } from '~/server/services/configuration.service';

export interface CmsDependencies {
	consulterAnnonceLogement: ConsulterAnnonceLogementUseCase
  consulterArticle: ConsulterArticleUseCase
  consulterFicheMetier: ConsulterFicheMetierUseCase
  consulterMentionObligatoire: ConsulterMentionObligatoireUseCase
	consulterOffreStage: ConsulterOffreStageUseCase
	enregistrerOffreDeStage: enregistrerOffreDeStageUseCase
  duréeDeValiditéEnSecondes: () => number
	listerQuestionsFAQ: ListerQuestionsFAQUseCase
	listerNomMétierFicheMétier: ListerNomMétierFicheMétierUseCase
  récupererActualites: RécupererActualitesUseCase
  listerServicesJeunes: ListerServicesJeunesUseCase
  récupérerMesuresEmployeurs: RécupérerMesuresEmployeursUseCase
}

const UN_JOUR_EN_SECONDES = 60 * 60 * 24;

export function cmsDependenciesContainer(cmsRepository: CmsRepository, configurationService: ConfigurationService): CmsDependencies {
	const { IS_REVIEW_APP } = configurationService.getConfiguration();
	const duréeDeValiditéEnSecondes = IS_REVIEW_APP ? 20 : UN_JOUR_EN_SECONDES;

	return {
		consulterAnnonceLogement: new ConsulterAnnonceLogementUseCase(cmsRepository),
		consulterArticle: new ConsulterArticleUseCase(cmsRepository),
		consulterFicheMetier: new ConsulterFicheMetierUseCase(cmsRepository),
		consulterMentionObligatoire: new ConsulterMentionObligatoireUseCase(cmsRepository),
		consulterOffreStage: new ConsulterOffreStageUseCase(cmsRepository),
		duréeDeValiditéEnSecondes: () => duréeDeValiditéEnSecondes,
		enregistrerOffreDeStage: new enregistrerOffreDeStageUseCase(cmsRepository),
		listerNomMétierFicheMétier: new ListerNomMétierFicheMétierUseCase(cmsRepository),
		listerQuestionsFAQ: new ListerQuestionsFAQUseCase(cmsRepository),
		listerServicesJeunes: new ListerServicesJeunesUseCase(cmsRepository),
		récupererActualites: new RécupererActualitesUseCase(cmsRepository),
		récupérerMesuresEmployeurs: new RécupérerMesuresEmployeursUseCase(cmsRepository),
	};
}
