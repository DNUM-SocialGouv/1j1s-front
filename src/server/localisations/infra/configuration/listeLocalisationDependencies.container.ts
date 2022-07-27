import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { RechercherLocalisationUseCase } from '~/server/localisations/useCases/rechercherLocalisation.useCase';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ApiAdresseHttpClientService } from '~/server/services/http/apiAdresseHttpClient.service';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export interface ListeLocalisationDependenciesContainer {
  readonly listeLocalisation: RechercherLocalisationUseCase;
}

export const listeLocalisationDependenciesContainer = (
  apiAdresseHttpClientService: ApiAdresseHttpClientService,
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,

): ListeLocalisationDependenciesContainer => {
  const localisationRepository = new ApiGeoLocalisationRepository(
    apiGeoGouvHttpClientService,
    apiPoleEmploiRéférentielRepository,
  );
  const localisationAvecCoordonnéesRepository = new ApiAdresseRepository(apiAdresseHttpClientService);

  return {
    listeLocalisation: new RechercherLocalisationUseCase(localisationRepository, localisationAvecCoordonnéesRepository),
  };
};
