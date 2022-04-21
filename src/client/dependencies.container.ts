import { uuid4 } from "@sentry/utils";

import { HttpClientService } from "./services/httpClient.service";
import { LoggerService } from "./services/logger.service";
import StorageService, { Key } from './utils/sessionStorage.util'

export default function dependenciesContainer() {
  const sessionId = StorageService.getItem(Key.SESSION_ID) || uuid4();
  const loggerService = new LoggerService(sessionId);
  new HttpClientService(sessionId, loggerService);
}
