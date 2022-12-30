import { StrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository';
import { ConsulterArticleUseCase } from '~/server/cms/useCases/consulterArticle.useCase';
import { ConsulterFicheMetierUseCase } from '~/server/cms/useCases/consulterFicheMetier.useCase';
import { ConsulterMentionObligatoireUseCase } from '~/server/cms/useCases/consulterMentionObligatoireUseCase';
import { RécupererActualitesUseCase } from '~/server/cms/useCases/récupererActualitesUseCase';
import { RécupérerEspaceJeuneUseCase } from '~/server/cms/useCases/récupérerEspaceJeuneUseCase';
import { RécupérerMesuresEmployeursUseCase } from '~/server/cms/useCases/récupérerMesuresEmployeursUseCase';
import { ConfigurationService } from '~/server/services/configuration.service';

export interface CmsDependencies {
  consulterArticle: ConsulterArticleUseCase
  consulterFicheMetier: ConsulterFicheMetierUseCase
  consulterMentionObligatoire: ConsulterMentionObligatoireUseCase
  duréeDeValiditéEnSecondes: () => number
  récupererActualites: RécupererActualitesUseCase
  récupérerEspaceJeune: RécupérerEspaceJeuneUseCase
  récupérerMesuresEmployeurs: RécupérerMesuresEmployeursUseCase
}

const UN_JOUR_EN_SECONDES = 60 * 60 * 24;

export function cmsDependenciesContainer(cmsRepository: StrapiCmsRepository, configurationService: ConfigurationService): CmsDependencies {
	const { IS_REVIEW_APP } = configurationService.getConfiguration();
	const duréeDeValiditéEnSecondes = IS_REVIEW_APP ? 20 : UN_JOUR_EN_SECONDES;

	return {
		consulterArticle: new ConsulterArticleUseCase(cmsRepository),
		consulterFicheMetier: new ConsulterFicheMetierUseCase(cmsRepository),
		consulterMentionObligatoire: new ConsulterMentionObligatoireUseCase(cmsRepository),
		duréeDeValiditéEnSecondes: () => duréeDeValiditéEnSecondes,
		récupererActualites: new RécupererActualitesUseCase(cmsRepository),
		récupérerEspaceJeune: new RécupérerEspaceJeuneUseCase(cmsRepository),
		récupérerMesuresEmployeurs: new RécupérerMesuresEmployeursUseCase(cmsRepository),
	};
}
