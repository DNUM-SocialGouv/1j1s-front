import { ClientService } from "../../../services/http/ClientService";
import { ApiTokenRepository } from "../../../tokens/infra/ApiTokenRepository";
import { ListeOffreEmploi } from "../../usecases/ListeOffreEmploi";
import { ApiPoleEmploiOffreRepository } from "../repositories/ApiPoleEmploiOffreRepository";

export type ListeOffreEmploiDependenciesContainer = Readonly<{
  listeOffreEmploi: ListeOffreEmploi;
}>;

export const listeOffreEmploiDependenciesContainer = (
  httpClientService: ClientService,
  apiTokenRepository: ApiTokenRepository
): ListeOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(
    httpClientService,
    apiTokenRepository
  );

  return {
    listeOffreEmploi: new ListeOffreEmploi(emploiRepository),
  };
};
