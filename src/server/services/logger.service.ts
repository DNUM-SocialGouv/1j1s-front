import * as Sentry from '@sentry/nextjs';

export class LoggerService {
  private static log(
    message: string,
    level: Sentry.SeverityLevel,
  ) {
    Sentry.captureMessage(message, level);
  }

  static info(message: string) {
    this.log(message, 'info');
  }

  static warn(message: string) {
    this.log(message, 'warning');
  }

  static error(message: string) {
    this.log(message, 'error');
  }
}
