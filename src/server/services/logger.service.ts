import * as Sentry from '@sentry/nextjs';

export class LoggerService {
  private static log(
    message: string,
    level: Sentry.Severity,
  ) {
    Sentry.captureMessage(message, level);
  }

  static info(message: string) {
    this.log(message, Sentry.Severity.Info);
  }

  static warn(message: string) {
    this.log(message, Sentry.Severity.Warning);
  }

  static error(message: string) {
    this.log(message, Sentry.Severity.Error);
  }
}
