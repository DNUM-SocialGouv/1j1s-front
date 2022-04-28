import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import { RechercherOffreEmploiUseCase } from '~/server/offresEmploi/useCases/rechercherOffreEmploi.useCase';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export interface RechercherOffreEmploiDependenciesContainer {
  readonly rechercherOffreEmploi: RechercherOffreEmploiUseCase;
};

export const rechercherOffreEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
): RechercherOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(poleEmploiHttpClientService);

  return {
    rechercherOffreEmploi: new RechercherOffreEmploiUseCase(emploiRepository),
  };
};
