import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import { RechercherCommuneUseCase } from '~/server/localisations/useCases/rechercherCommune.useCase';

import { OldHttpClientService } from '../../../services/http/oldHttpClientService';


export interface ListeCommuneDependenciesContainer {
  readonly rechercherCommune: RechercherCommuneUseCase;
};

export const rechercherCommuneDependenciesContainer = (
  httpClientService: OldHttpClientService,
): ListeCommuneDependenciesContainer => {
  const apiAdresseRepository = new ApiAdresseRepository(
    httpClientService,
  );

  return {
    rechercherCommune: new RechercherCommuneUseCase(apiAdresseRepository),
  };
};
