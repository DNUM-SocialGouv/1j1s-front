import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import { ListeOffreEmploiUseCase } from '~/server/offresEmploi/useCases/listeOffreEmploi.useCase';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export type ListeOffreEmploiDependenciesContainer = Readonly<{
  listeOffreEmploi: ListeOffreEmploiUseCase;
}>;

export const listeOffreEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService,
): ListeOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(
    poleEmploiHttpClientService,
  );

  return {
    listeOffreEmploi: new ListeOffreEmploiUseCase(emploiRepository),
  };
};
