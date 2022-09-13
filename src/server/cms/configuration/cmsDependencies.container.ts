import { StrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository';
import { ConsulterArticleUseCase } from '~/server/cms/useCases/consulterArticle.useCase';
import { ConsulterMentionObligatoireUseCase } from '~/server/cms/useCases/consulterMentionObligatoireUseCase';
import { RécupérerMesuresJeunesUseCase } from '~/server/cms/useCases/récupérerMesuresJeunesUseCase';
import { ConfigurationService } from '~/server/services/configuration.service';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface CmsDependencies {
  consulterArticle: ConsulterArticleUseCase
  consulterMentionObligatoire: ConsulterMentionObligatoireUseCase
  récupérerMesuresJeunes: RécupérerMesuresJeunesUseCase
  duréeDeValiditéEnSecondes: () => number
}

export const cmsDependenciesContainer = (httpClientService: HttpClientService, configurationService: ConfigurationService): CmsDependencies => {
  const repository = new StrapiCmsRepository(httpClientService);
  const { IS_REVIEW_APP } = configurationService.getConfiguration();
  const duréeDeValidité = IS_REVIEW_APP ? 60 : 60 * 60 * 24;

  return {
    consulterArticle: new ConsulterArticleUseCase(repository),
    consulterMentionObligatoire: new ConsulterMentionObligatoireUseCase(repository),
    duréeDeValiditéEnSecondes: () => duréeDeValidité,
    récupérerMesuresJeunes: new RécupérerMesuresJeunesUseCase(repository),
  };
};
