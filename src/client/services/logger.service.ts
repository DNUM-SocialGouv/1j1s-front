import * as Sentry from '@sentry/nextjs';

export class LoggerService {
  constructor(sessionId: string) {
    Sentry.configureScope((scope: Sentry.Scope) => {
      scope.setTag('session_id', sessionId);
    });
  }

  private static log(
    message: string,
    level: string,
  ) {
    Sentry.captureMessage(message, level);
  }

  info(message: string) {
    LoggerService.log(message, 'info');
  }

  warn(message: string) {
    LoggerService.log(message, 'warning');
  }

  error(message: string) {
    LoggerService.log(message, 'error');
  }

  setTransactionId(transactionId: string): void {
    Sentry.configureScope((scope) => {
      scope.setTag('transaction_id', transactionId);
    });
  }
}
