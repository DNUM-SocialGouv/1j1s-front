import { StrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository';
import { ConsulterArticleUseCase } from '~/server/cms/useCases/consulterArticle.useCase';
import { ConsulterPageFooterUseCase } from '~/server/cms/useCases/consulterPageFooterUseCase';
import { RécupérerMesuresJeunesUseCase } from '~/server/cms/useCases/récupérerMesuresJeunesUseCase';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export interface CmsDependencies {
  consulterArticle: ConsulterArticleUseCase
  consulterPageFooter: ConsulterPageFooterUseCase
  récupérerMesuresJeunes: RécupérerMesuresJeunesUseCase
}

export const cmsDependenciesContainer = (strapiHttpClientService: StrapiHttpClientService): CmsDependencies => {
  const repository = new StrapiCmsRepository(strapiHttpClientService);

  return {
    consulterArticle: new ConsulterArticleUseCase(repository),
    consulterPageFooter: new ConsulterPageFooterUseCase(repository),
    récupérerMesuresJeunes: new RécupérerMesuresJeunesUseCase(repository),
  };
};
