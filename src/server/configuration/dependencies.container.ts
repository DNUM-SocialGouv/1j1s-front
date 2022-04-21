import {
  MetierRechercheDependencies,
  metierRechercheDependenciesContainer,
} from "../alternances/configuration/metierRecherche.dependencies";
import {
  JobEtudiantDependencies,
  jobEtudiantDependenciesContainer,
} from "../jobetudiants/configuration/jobEtudiants.dependencies";
import {
  OffreEmploiDependencies,
  offreEmploiDependenciesContainer,
} from "../offreemplois/configuration/offreEmploi.dependencies";
import { LaBonneAlternanceHttpClient } from "../services/http/laBonneAlternanceHttpClient.service";
import { PoleEmploiHttpClientService } from "../services/http/poleEmploiHttpClient.service";
import { ServerConfigurationService } from "../services/serverConfiguration.service";

export type Dependencies = {
  offreEmploiDependencies: OffreEmploiDependencies;
  jobEtudiantDependencies: JobEtudiantDependencies;
  metierRechercheDependencies: MetierRechercheDependencies;
};

export const dependenciesContainer = (): Dependencies => {
  const serverConfigurationService = new ServerConfigurationService();
  const poleEmploiHttpClientService = new PoleEmploiHttpClientService(
    serverConfigurationService
  );
  const laBonneAlternanceHttpClient = new LaBonneAlternanceHttpClient(
    serverConfigurationService
  );

  const offreEmploiDependencies = offreEmploiDependenciesContainer(
    poleEmploiHttpClientService
  );
  const jobEtudiantDependencies = jobEtudiantDependenciesContainer(
    poleEmploiHttpClientService
  );

  const metierRechercheDependencies = metierRechercheDependenciesContainer(
    laBonneAlternanceHttpClient
  );
  return {
    jobEtudiantDependencies,
    metierRechercheDependencies,
    offreEmploiDependencies,
  };
};
