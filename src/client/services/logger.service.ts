import * as Sentry from '@sentry/nextjs';

export class LoggerService {
  constructor(sessionId: string) {
    Sentry.configureScope((scope: Sentry.Scope) => {
      scope.setTag('session_id', sessionId);
    });
  }

  private static log(
    message: string,
    level: Sentry.Severity,
  ) {
    Sentry.captureMessage(message, level);
  }

  info(message: string) {
    LoggerService.log(message, Sentry.Severity.Info);
  }

  warn(message: string) {
    LoggerService.log(message, Sentry.Severity.Warning);
  }

  error(message: string) {
    LoggerService.log(message, Sentry.Severity.Error);
  }

  setTransactionId(transactionId: string): void {
    Sentry.configureScope((scope) => {
      scope.setTag('transaction_id', transactionId);
    });
  }
}
