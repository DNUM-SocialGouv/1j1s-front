import { sessionAppRawDataStorage } from '~/client/cache/appRawDataStorage';
import { HttpClientService } from '~/client/services/httpClient.service';
import { LoggerService } from '~/client/services/logger.service';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';

export type Dependency = Dependencies[keyof Dependencies];

export interface Dependencies {
  offreEmploiService: OffreEmploiService
}

export default function dependenciesContainer(sessionId: string): Dependencies {
  const loggerService = new LoggerService(sessionId);
  const httpClientService =  new HttpClientService(sessionId, loggerService);
  const offreEmploiService = new OffreEmploiService(httpClientService, sessionAppRawDataStorage);

  return { offreEmploiService };
}
