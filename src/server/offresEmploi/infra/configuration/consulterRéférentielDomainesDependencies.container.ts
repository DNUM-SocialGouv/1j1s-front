import { ApiPoleEmploiRéférentielRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentielRepository';
import { ConsulterRéférentielDomainesUseCase } from '~/server/offresEmploi/useCases/consulterRéférentielDomaines.useCase';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export interface ConsulterRéférentielDomainesDependenciesContainer {
  readonly consulterRéférentielDomaines: ConsulterRéférentielDomainesUseCase
}

export const consulterRéférentielDomainesDependenciesContainer = (poleEmploiHttpClientService: PoleEmploiHttpClientService): ConsulterRéférentielDomainesDependenciesContainer => {
  const référentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiHttpClientService);

  return {
    consulterRéférentielDomaines: new ConsulterRéférentielDomainesUseCase(référentielRepository),
  };
};
