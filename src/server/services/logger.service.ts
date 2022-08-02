import * as Sentry from '@sentry/nextjs';

export class LoggerService {
  private static log(
    message: string,
    level: Sentry.Severity,
  ) {
    Sentry.withScope(function(scope) {
      scope.setLevel(level);

      Sentry.captureMessage(message);
    });
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
