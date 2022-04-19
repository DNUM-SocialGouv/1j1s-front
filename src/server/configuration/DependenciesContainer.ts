import {
  MetierRechercheDependencies,
  metierRechercheDependenciesContainer,
} from "../alternances/configuration/MetierRechercheDependencies";
import {
  JobEtudiantDependencies,
  jobEtudiantDependenciesContainer,
} from "../jobetudiants/configuration/JobEtudiantsDependencies";
import {
  OffreEmploiDependencies,
  offreEmploiDependenciesContainer,
} from "../offreemplois/configuration/OffreEmploiDependencies";
import { RedisCacheService } from "../services/cache/RedisCacheService";
import { JavascriptDateService } from "../services/date/JavascriptDateService";
import { HttpClientService } from "../services/http/HttpClientService";
import { ServerConfigurationService } from "../services/ServerConfigurationService";
import { ApiPoleEmploiTokenRepository } from "../tokens/infra/ApiPoleEmploiTokenRepository";

export type Dependencies = {
  offreEmploiDependencies: OffreEmploiDependencies;
  jobEtudiantDependencies: JobEtudiantDependencies;
  metierRechercheDependencies: MetierRechercheDependencies;
};

export const dependenciesContainer = (): Dependencies => {
  const serverConfigurationService = new ServerConfigurationService();
  const httpClientService = new HttpClientService();
  const httpAuthPoleEmploiClient = new HttpClientService();
  const redisCacheService = new RedisCacheService(serverConfigurationService);
  const apiPoleEmploiTokenRepository = new ApiPoleEmploiTokenRepository(
    new JavascriptDateService(),
    serverConfigurationService,
    httpAuthPoleEmploiClient,
    redisCacheService
  );
  const offreEmploiDependencies = offreEmploiDependenciesContainer(
    httpClientService,
    apiPoleEmploiTokenRepository
  );
  const jobEtudiantDependencies = jobEtudiantDependenciesContainer(
    httpClientService,
    apiPoleEmploiTokenRepository
  );

  const metierRechercheDependencies =
    metierRechercheDependenciesContainer(httpClientService);
  return {
    jobEtudiantDependencies,
    metierRechercheDependencies,
    offreEmploiDependencies,
  };
};
