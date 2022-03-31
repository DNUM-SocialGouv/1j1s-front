import {
  JobEtudiantDependencies,
  jobEtudiantDependenciesContainer,
} from "../jobetudiants/configuration/JobEtudiantsDependencies";
import {
  OffreEmploiDependencies,
  offreEmploiDependenciesContainer,
} from "../offreemplois/configuration/OffreEmploiDependencies";
import { LuxonDateService } from "../services/date/LuxonDateService";
import { HttpPoleEmploiClientService } from "../services/http/HttpPoleEmploiClientService";
import { ServerConfigurationService } from "../services/ServerConfigurationService";
import { ApiPoleEmploiTokenRepository } from "../tokens/infra/ApiPoleEmploiTokenRepository";

export type Dependencies = {
  offreEmploiDependencies: OffreEmploiDependencies;
  jobEtudiantDependencies: JobEtudiantDependencies;
};

export const dependenciesContainer = (): Dependencies => {
  const httpApiPoleEmploiClient = new HttpPoleEmploiClientService();
  const httpAuthPoleEmploiClient = new HttpPoleEmploiClientService();
  const apiPoleEmploiTokenRepository = new ApiPoleEmploiTokenRepository(
    new LuxonDateService(),
    new ServerConfigurationService(),
    httpAuthPoleEmploiClient
  );
  const offreEmploiDependencies = offreEmploiDependenciesContainer(
    httpApiPoleEmploiClient,
    apiPoleEmploiTokenRepository
  );
  const jobEtudiantDependencies = jobEtudiantDependenciesContainer(
    httpApiPoleEmploiClient,
    apiPoleEmploiTokenRepository
  );
  return { jobEtudiantDependencies, offreEmploiDependencies };
};
