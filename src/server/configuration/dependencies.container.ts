import {
  MetierRechercheDependencies,
  metierRechercheDependenciesContainer,
} from "~/server/alternances/configuration/metierRecherche.dependencies";
import {
  JobsEtudiantDependencies,
  jobsEtudiantDependenciesContainer,
} from "~/server/jobsEtudiant/configuration/jobsEtudiant.dependencies";
import {
  OffresEmploiDependencies,
  offresEmploiDependenciesContainer,
} from "~/server/offresEmploi/configuration/offresEmploi.dependencies";
import { StrapiCmsService } from "~/server/services/cms/infra/repostitories/strapiCms.service";
import { LaBonneAlternanceHttpClient } from "~/server/services/http/laBonneAlternanceHttpClient.service";
import { PoleEmploiHttpClientService } from "~/server/services/http/poleEmploiHttpClient.service";
import { StrapiHttpClientService } from "~/server/services/http/strapiHttpClient.service";
import { ServerConfigurationService } from "~/server/services/serverConfiguration.service";

export type Dependencies = {
  offreEmploiDependencies: OffresEmploiDependencies;
  jobEtudiantDependencies: JobsEtudiantDependencies;
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

  const offreEmploiDependencies = offresEmploiDependenciesContainer(
    poleEmploiHttpClientService
  );
  const jobEtudiantDependencies = jobsEtudiantDependenciesContainer(
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
