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
import { StrapiCmsService } from "../services/cms/infra/repostitories/strapiCms.service";
import { LaBonneAlternanceHttpClient } from "../services/http/laBonneAlternanceHttpClient.service";
import { PoleEmploiHttpClientService } from "../services/http/poleEmploiHttpClient.service";
import { StrapiHttpClientService } from "../services/http/strapiHttpClient.service";
import { ServerConfigurationService } from "../services/serverConfiguration.service";

export type Dependencies = {
  offreEmploiDependencies: OffreEmploiDependencies;
  jobEtudiantDependencies: JobEtudiantDependencies;
  metierRechercheDependencies: MetierRechercheDependencies;
  accueilCMSDependencies: StrapiCmsService;
};

export const dependenciesContainer = (): Dependencies => {
  const serverConfigurationService = new ServerConfigurationService();
  const poleEmploiHttpClientService = new PoleEmploiHttpClientService(
    serverConfigurationService
  );
  const laBonneAlternanceHttpClient = new LaBonneAlternanceHttpClient(
    serverConfigurationService
  );
  const strapiHttpClientService = new StrapiHttpClientService(
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
    accueilCMSDependencies: new StrapiCmsService(
      strapiHttpClientService,
      serverConfigurationService
    ),
    jobEtudiantDependencies,
    metierRechercheDependencies,
    offreEmploiDependencies,
  };
};
