import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import { RechercherCommuneUseCase } from '~/server/localisations/useCases/rechercherCommune.useCase';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';


export interface ListeCommuneDependenciesContainer {
  readonly rechercherCommune: RechercherCommuneUseCase;
};

export const rechercherCommuneDependenciesContainer = (
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
): ListeCommuneDependenciesContainer => {
  const apiAdresseRepository = new ApiAdresseRepository(
    apiAdresseHttpClientService,
  );

  return {
    rechercherCommune: new RechercherCommuneUseCase(apiAdresseRepository),
  };
};
