import * as Sentry from '@sentry/nextjs';

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
    } as Sentry.Breadcrumb);
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
}
