import { StrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository';
import { ConsulterArticleUseCase } from '~/server/cms/useCases/consulterArticle.useCase';
import { ConsulterMentionObligatoireUseCase } from '~/server/cms/useCases/consulterMentionObligatoireUseCase';
import { RécupérerMesuresJeunesUseCase } from '~/server/cms/useCases/récupérerMesuresJeunesUseCase';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export interface CmsDependencies {
  consulterArticle: ConsulterArticleUseCase
  consulterMentionObligatoire: ConsulterMentionObligatoireUseCase
  récupérerMesuresJeunes: RécupérerMesuresJeunesUseCase
}

export const cmsDependenciesContainer = (strapiHttpClientService: StrapiHttpClientService): CmsDependencies => {
  const repository = new StrapiCmsRepository(strapiHttpClientService);

  return {
    consulterArticle: new ConsulterArticleUseCase(repository),
    consulterMentionObligatoire: new ConsulterMentionObligatoireUseCase(repository),
    récupérerMesuresJeunes: new RécupérerMesuresJeunesUseCase(repository),
  };
};
