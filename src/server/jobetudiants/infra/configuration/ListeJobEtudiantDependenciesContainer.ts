import { HttpClientService } from "../../../services/http/HttpClientService";
import { ApiTokenRepository } from "../../../tokens/infra/ApiTokenRepository";
import { ListeJobEtudiant } from "../../usecases/ListeJobEtudiant";
import { ApiPoleEmploiJobEtudiantRepository } from "../repositories/ApiPoleEmploiJobEtudiantRepository";

export type ListeJobEtudiantDependenciesContainer = Readonly<{
  listeJobEtudiant: ListeJobEtudiant;
}>;

export const listeJobEtudiantDependenciesContainer = (
  httpClientService: HttpClientService,
  apiTokenRepository: ApiTokenRepository
): ListeJobEtudiantDependenciesContainer => {
  const jobEtudiantRepository = new ApiPoleEmploiJobEtudiantRepository(
    httpClientService,
    apiTokenRepository
  );

  return {
    listeJobEtudiant: new ListeJobEtudiant(jobEtudiantRepository),
  };
};
