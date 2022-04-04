import { CacheService } from "../../../services/cache/CacheService";
import { HttpClientService } from "../../../services/http/HttpClientService";
import { ApiTokenRepository } from "../../../tokens/infra/ApiTokenRepository";
import { ListeOffreEmploi } from "../../usecases/ListeOffreEmploi";
import { ApiPoleEmploiOffreRepository } from "../repositories/ApiPoleEmploiOffreRepository";

export type ListeOffreEmploiDependenciesContainer = Readonly<{
  listeOffreEmploi: ListeOffreEmploi;
}>;

export const listeOffreEmploiDependenciesContainer = (
  httpClientService: HttpClientService,
  apiTokenRepository: ApiTokenRepository,
  cacheService: CacheService
): ListeOffreEmploiDependenciesContainer => {
  const emploiRepository = new ApiPoleEmploiOffreRepository(
    httpClientService,
    apiTokenRepository,
    cacheService
  );

  return {
    listeOffreEmploi: new ListeOffreEmploi(emploiRepository),
  };
};
