import { StrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository';
import { ConsulterArticleUseCase } from '~/server/cms/useCases/consulterArticle.useCase';
import { ConsulterMentionObligatoireUseCase } from '~/server/cms/useCases/consulterMentionObligatoireUseCase';
import { RécupérerMesuresJeunesUseCase } from '~/server/cms/useCases/récupérerMesuresJeunesUseCase';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export interface CmsDependencies {
  consulterArticle: ConsulterArticleUseCase
  consulterMentionObligatoire: ConsulterMentionObligatoireUseCase
  récupérerMesuresJeunes: RécupérerMesuresJeunesUseCase
}

export const cmsDependenciesContainer = (httpClientService: HttpClientService): CmsDependencies => {
  const repository = new StrapiCmsRepository(httpClientService);

  return {
    consulterArticle: new ConsulterArticleUseCase(repository),
    consulterMentionObligatoire: new ConsulterMentionObligatoireUseCase(repository),
    récupérerMesuresJeunes: new RécupérerMesuresJeunesUseCase(repository),
  };
};
