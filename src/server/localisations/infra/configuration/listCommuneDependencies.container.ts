import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import { RechercherCommuneUseCase } from '~/server/localisations/useCases/rechercherCommune.useCase';
import { HttpClientService } from '~/server/services/http/httpClient.service';


export interface ListeCommuneDependenciesContainer {
  readonly rechercherCommune: RechercherCommuneUseCase;
};

export const rechercherCommuneDependenciesContainer = (
  httpClientService: HttpClientService,
): ListeCommuneDependenciesContainer => {
  const apiAdresseRepository = new ApiAdresseRepository(
    httpClientService,
  );

  return {
    rechercherCommune: new RechercherCommuneUseCase(apiAdresseRepository),
  };
};
