import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import { ConsulterOffreEmploiUseCase } from '~/server/offresEmploi/useCases/consulterOffreEmploi.useCase';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export interface ConsulterOffreEmploiDependenciesContainer {
  readonly consulterOffreEmploi: ConsulterOffreEmploiUseCase;
};

export const consulterOffreEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
): ConsulterOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(poleEmploiHttpClientService);

  return {
    consulterOffreEmploi: new ConsulterOffreEmploiUseCase(emploiRepository),
  };
};
