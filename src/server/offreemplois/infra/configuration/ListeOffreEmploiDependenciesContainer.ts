import { ListeOffreEmploi } from "../../usecases/ListeOffreEmploi";
import { ApiPoleEmploiOffreRepository } from "../repositories/ApiPoleEmploiOffreRepository";
import { ApiTokenRepository } from "../../../tokens/infra/ApiTokenRepository";
import { HttpClientService } from "../../../services/http/HttpClientService";

export type ListeOffreEmploiDependenciesContainer = Readonly<{
  listeOffreEmploi: ListeOffreEmploi;
}>;

export const listeOffreEmploiDependenciesContainer = (
  httpClientService: HttpClientService,
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
