import * as Sentry from '@sentry/nextjs';
import { Breadcrumb } from '@sentry/nextjs';

export class LoggerService {
  private static log(
    message: string,
    level: Sentry.Severity,
    category: string | undefined = undefined,
  ) {
    Sentry.addBreadcrumb({
      category,
      level,
      message,
    } as Breadcrumb);
  }

  static info(message: string, category: string | undefined = undefined) {
    this.log(message, Sentry.Severity.Info, category);
  }

  static warn(message: string, category: string | undefined = undefined) {
    this.log(message, Sentry.Severity.Warning, category);
  }

  static error(message: string, category: string | undefined = undefined) {
    this.log(message, Sentry.Severity.Error, category);
  }

  static setTransactionId(transactionId: string): void {
    Sentry.configureScope((scope) => {
      scope.setTag('transaction_id', transactionId);
    });
  }

  static setSessionId(sessionId: string): void {
    Sentry.configureScope((scope) => {
      scope.setTag('session_id', sessionId);
    });
  }
}
