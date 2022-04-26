import {
  ListeMétierRecherchéDependenciesContainer,
  listeMétierRecherchéDependenciesContainer,
} from '~/server/alternances/infra/configuration/listeMétierRecherchéDependencies.container';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export type MétierRecherchéDependencies =
  ListeMétierRecherchéDependenciesContainer;

export const métierRecherchéDependenciesContainer = (laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient): MétierRecherchéDependencies => {
  return {
    ...listeMétierRecherchéDependenciesContainer(laBonneAlternanceHttpClient),
  };
};
