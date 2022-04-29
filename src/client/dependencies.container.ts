import { HttpClientService } from '~/client/services/httpClient.service';
import { LoggerService } from '~/client/services/logger.service';
import { OffreEmploiService } from '~/client/services/offreEmploi.service';

export default function dependenciesContainer(sessionId: string) {
  const loggerService = new LoggerService(sessionId);
  const httpClientService =  new HttpClientService(sessionId, loggerService);
  const offreEmploiService = new OffreEmploiService(httpClientService);

  return { offreEmploiService };
}
