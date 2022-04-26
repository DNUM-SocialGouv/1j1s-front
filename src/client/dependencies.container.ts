import { uuid4 } from '@sentry/utils';

import { HttpClientService } from '~/client/services/httpClient.service';
import { LoggerService } from '~/client/services/logger.service';
import StorageService from '~/client/utils/sessionStorage.util';

export default function dependenciesContainer() {
  const sessionId =
    StorageService.getItem(StorageService.Key.SESSION_ID) || uuid4();
  const loggerService = new LoggerService(sessionId);
  new HttpClientService(sessionId, loggerService);
}
