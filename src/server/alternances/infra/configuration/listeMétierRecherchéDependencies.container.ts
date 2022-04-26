import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { ListeMétierRecherchéUseCase } from '~/server/alternances/useCases/listeMétierRecherché.useCase';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export interface ListeMétierRecherchéDependenciesContainer {
  readonly listeMétierRecherché: ListeMétierRecherchéUseCase;
};

export function listeMétierRecherchéDependenciesContainer (laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient): ListeMétierRecherchéDependenciesContainer {
  const jobEtudiantRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

  return {
    listeMétierRecherché: new ListeMétierRecherchéUseCase(jobEtudiantRepository),
  };
};
