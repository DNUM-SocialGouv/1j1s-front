import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { ConsulterArticleUseCase } from '~/server/cms/useCases/consulterArticle.useCase';
import { ConsulterMentionObligatoireUseCase } from '~/server/cms/useCases/consulterMentionObligatoire.useCase';
import { RécupérerActualitésUseCase } from '~/server/cms/useCases/récupérerActualités.useCase';
import { RécupérerMesuresEmployeursUseCase } from '~/server/cms/useCases/récupérerMesuresEmployeurs.useCase';
import { ConfigurationService } from '~/server/services/configuration.service';

export interface CmsDependencies {
	consulterArticle: ConsulterArticleUseCase
	consulterMentionObligatoire: ConsulterMentionObligatoireUseCase
	duréeDeValiditéEnSecondes: () => number
	récupérerActualités: RécupérerActualitésUseCase
	récupérerMesuresEmployeurs: RécupérerMesuresEmployeursUseCase
}

const UN_JOUR_EN_SECONDES = 60 * 60 * 24;

export function cmsDependenciesContainer(cmsRepository: CmsRepository, configurationService: ConfigurationService): CmsDependencies {
	const { IS_REVIEW_APP } = configurationService.getConfiguration();
	const duréeDeValiditéEnSecondes = IS_REVIEW_APP ? 20 : UN_JOUR_EN_SECONDES;

	return {
		consulterArticle: new ConsulterArticleUseCase(cmsRepository),
		consulterMentionObligatoire: new ConsulterMentionObligatoireUseCase(cmsRepository),
		duréeDeValiditéEnSecondes: () => duréeDeValiditéEnSecondes,
		récupérerActualités: new RécupérerActualitésUseCase(cmsRepository),
		récupérerMesuresEmployeurs: new RécupérerMesuresEmployeursUseCase(cmsRepository),
	};
}
