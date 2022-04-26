import * as Sentry from '@sentry/nextjs';
import { Breadcrumb } from '@sentry/nextjs';

export class LoggerService {
  constructor(sessionId: string) {
    Sentry.configureScope((scope: Sentry.Scope) => {
      scope.setTag('session_id', sessionId);
    });
  }

  private log(
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

  info(message: string, category: string | undefined = undefined) {
    this.log(message, Sentry.Severity.Info, category);
  }

  warn(message: string, category: string | undefined = undefined) {
    this.log(message, Sentry.Severity.Warning, category);
  }

  error(message: string, category: string | undefined = undefined) {
    this.log(message, Sentry.Severity.Error, category);
  }

  setTransactionId(transactionId: string): void {
    Sentry.configureScope((scope) => {
      scope.setTag('transaction_id', transactionId);
    });
  }
}
