import { ClientService } from "../../../services/http/ClientService";
import { ApiTokenRepository } from "../../../tokens/infra/ApiTokenRepository";
import { ListeJobEtudiant } from "../../usecases/ListeJobEtudiant";
import { ApiPoleEmploiJobEtudiantRepository } from "../repositories/ApiPoleEmploiJobEtudiantRepository";

export type ListeJobEtudiantDependenciesContainer = Readonly<{
  listeJobEtudiant: ListeJobEtudiant;
}>;

export const listeJobEtudiantDependenciesContainer = (
  httpClientService: ClientService,
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
