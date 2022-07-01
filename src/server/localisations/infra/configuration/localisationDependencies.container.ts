import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { RécupérerLocalisationAvecCodeInseeUseCase } from '~/server/localisations/useCases/récupérerLocalisationAvecCodeInsee.useCase';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { ApiGeoHttpClientService } from '~/server/services/http/apiGeoHttpClient.service';

export interface LocalisationDependenciesContainer {
  readonly récupérerLocalisation: RécupérerLocalisationAvecCodeInseeUseCase;
};

export const récupérerLocalisationAvecDependenciesContainer = (
  apiGeoGouvHttpClientService: ApiGeoHttpClientService,
  apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
): LocalisationDependenciesContainer => {
  const localisationRepository = new ApiGeoLocalisationRepository(
    apiGeoGouvHttpClientService,
    apiPoleEmploiRéférentielRepository,
  );

  return {
    récupérerLocalisation: new RécupérerLocalisationAvecCodeInseeUseCase(localisationRepository),
  };
};
