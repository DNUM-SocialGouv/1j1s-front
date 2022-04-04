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
import { LuxonDateService } from "../services/date/LuxonDateService";
import { HttpLaBonneAlternanceClientService } from "../services/http/HttpLaBonneAlternanceClientService";
import { HttpPoleEmploiClientService } from "../services/http/HttpPoleEmploiClientService";
import { ServerConfigurationService } from "../services/ServerConfigurationService";
import { ApiPoleEmploiTokenRepository } from "../tokens/infra/ApiPoleEmploiTokenRepository";

export type Dependencies = {
  offreEmploiDependencies: OffreEmploiDependencies;
  jobEtudiantDependencies: JobEtudiantDependencies;
  metierRechercheDependencies: MetierRechercheDependencies;
};

export const dependenciesContainer = (): Dependencies => {
  const serverConfigurationService = new ServerConfigurationService();
  const httpApiPoleEmploiClient = new HttpPoleEmploiClientService();
  const httpAuthPoleEmploiClient = new HttpPoleEmploiClientService();
  const apiPoleEmploiTokenRepository = new ApiPoleEmploiTokenRepository(
    new LuxonDateService(),
    serverConfigurationService,
    httpAuthPoleEmploiClient
  );
  const redisCacheService = new RedisCacheService(serverConfigurationService);
  const offreEmploiDependencies = offreEmploiDependenciesContainer(
    httpApiPoleEmploiClient,
    apiPoleEmploiTokenRepository,
    redisCacheService
  );
  const jobEtudiantDependencies = jobEtudiantDependenciesContainer(
    httpApiPoleEmploiClient,
    apiPoleEmploiTokenRepository
  );

  const httpLaBonneAlternanceClient = new HttpLaBonneAlternanceClientService();
  const metierRechercheDependencies = metierRechercheDependenciesContainer(
    httpLaBonneAlternanceClient
  );
  return {
    jobEtudiantDependencies,
    metierRechercheDependencies,
    offreEmploiDependencies,
  };
};
