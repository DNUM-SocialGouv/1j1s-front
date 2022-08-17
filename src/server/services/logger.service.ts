/* eslint-disable no-console */

import * as Sentry from '@sentry/nextjs';

export class LoggerService {
  private static log(
    message: string,
    level: Sentry.SeverityLevel,
  ) {
    Sentry.captureMessage(message, level);
  }

  static info(message: string) {
    console.log(message);
    this.log(message, 'info');
  }

  static warn(message: string) {
    console.warn(message);
    this.log(message, 'warning');
  }

  static error(message: string) {
    console.error(message);
    this.log(message, 'error');
  }
}
