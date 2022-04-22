import { PoleEmploiHttpClientService } from "../../../services/http/poleEmploiHttpClient.service";
import { ListeOffreEmploiUseCase } from "../../usecases/listeOffreEmploi.useCase";
import { ApiPoleEmploiOffreRepository } from "../repositories/apiPoleEmploiOffre.repository";

export type ListeOffreEmploiDependenciesContainer = Readonly<{
  listeOffreEmploi: ListeOffreEmploiUseCase;
}>;

export const listeOffreEmploiDependenciesContainer = (
  poleEmploiHttpClientService: PoleEmploiHttpClientService
): ListeOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(
    poleEmploiHttpClientService
  );

  return {
    listeOffreEmploi: new ListeOffreEmploiUseCase(emploiRepository),
  };
};
