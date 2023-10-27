import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { ConsulterAnnonceLogementUseCase } from '~/server/cms/useCases/consulterAnnonceLogement.useCase';
import { ConsulterArticleUseCase } from '~/server/cms/useCases/consulterArticle.useCase';
import { ConsulterMentionObligatoireUseCase } from '~/server/cms/useCases/consulterMentionObligatoire.useCase';
import { ConsulterOffreStageUseCase } from '~/server/cms/useCases/consulterOffreStage.useCase';
import { enregistrerOffreDeStageUseCase } from '~/server/cms/useCases/enregistrerOffreDeStage.useCase';
import { ListerServicesJeunesUseCase } from '~/server/cms/useCases/listerServicesJeunes.useCase';
import { RécupérerActualitésUseCase } from '~/server/cms/useCases/récupérerActualités.useCase';
import { RécupérerMesuresEmployeursUseCase } from '~/server/cms/useCases/récupérerMesuresEmployeurs.useCase';
import {
	RecupererVideosCampagneApprentissageUseCase,
} from '~/server/cms/useCases/recupererVideosCampagneApprentissage.useCase';
import { ConfigurationService } from '~/server/services/configuration.service';

export interface CmsDependencies {
	consulterAnnonceLogement: ConsulterAnnonceLogementUseCase
	consulterArticle: ConsulterArticleUseCase
	consulterMentionObligatoire: ConsulterMentionObligatoireUseCase
	consulterOffreStage: ConsulterOffreStageUseCase
	enregistrerOffreDeStage: enregistrerOffreDeStageUseCase
	duréeDeValiditéEnSecondes: () => number
	récupérerActualités: RécupérerActualitésUseCase
	listerServicesJeunes: ListerServicesJeunesUseCase
	récupérerMesuresEmployeurs: RécupérerMesuresEmployeursUseCase
	recupererVideosCampagneApprentissage: RecupererVideosCampagneApprentissageUseCase
}

const UN_JOUR_EN_SECONDES = 60 * 60 * 24;

export function cmsDependenciesContainer(cmsRepository: CmsRepository, configurationService: ConfigurationService): CmsDependencies {
	const { IS_REVIEW_APP } = configurationService.getConfiguration();
	const duréeDeValiditéEnSecondes = IS_REVIEW_APP ? 20 : UN_JOUR_EN_SECONDES;

	return {
		consulterAnnonceLogement: new ConsulterAnnonceLogementUseCase(cmsRepository),
		consulterArticle: new ConsulterArticleUseCase(cmsRepository),
		consulterMentionObligatoire: new ConsulterMentionObligatoireUseCase(cmsRepository),
		consulterOffreStage: new ConsulterOffreStageUseCase(cmsRepository),
		duréeDeValiditéEnSecondes: () => duréeDeValiditéEnSecondes,
		enregistrerOffreDeStage: new enregistrerOffreDeStageUseCase(cmsRepository),
		listerServicesJeunes: new ListerServicesJeunesUseCase(cmsRepository),
		recupererVideosCampagneApprentissage: new RecupererVideosCampagneApprentissageUseCase(cmsRepository),
		récupérerActualités: new RécupérerActualitésUseCase(cmsRepository),
		récupérerMesuresEmployeurs: new RécupérerMesuresEmployeursUseCase(cmsRepository),
	};
}
