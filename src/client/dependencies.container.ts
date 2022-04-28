import { uuid4 } from '@sentry/utils';

import { HttpClientService } from '~/client/services/httpClient.service';
import { LoggerService } from '~/client/services/logger.service';
import { OffreEmploiService } from '~/client/services/offreEmploi.service';
import { getSessionStorage, SESSION_STORAGE_KEY } from '~/client/utils/sessionStorage.util';

export default function dependenciesContainer() {
  const sessionId = getSessionStorage(SESSION_STORAGE_KEY.SESSION_ID) || uuid4();
  const loggerService = new LoggerService(sessionId);
  const httpClientService =  new HttpClientService(sessionId, loggerService);
  const offreEmploiService = new OffreEmploiService(httpClientService);

  return { offreEmploiService };
}
