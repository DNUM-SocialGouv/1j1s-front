import { uuid4 } from "@sentry/utils";

import { HttpClientService } from "./httpClient.service";
import { LoggerService } from "./logger.service";

export default function appService() {
  const sessionId = uuid4();

  const loggerService = new LoggerService(sessionId);
  new HttpClientService(sessionId, loggerService);
}
