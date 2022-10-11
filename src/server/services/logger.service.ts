/* eslint-disable no-console */

import * as Sentry from '@sentry/nextjs';
import Chalk from 'chalk';

export class LoggerService {
  private static log(
    message: string,
    level: Sentry.SeverityLevel,
  ) {
    Sentry.captureMessage(message, level);
    if (process.env.NODE_ENV !== 'test') {
      console.log(LoggerService.formatLevel(level), message);
    }
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

  private static formatLevel(level: Sentry.SeverityLevel) {
    const label = level.toUpperCase().padEnd('warning'.length); // "warning" est le level le plus long
    if (level === 'info') {
      return Chalk.bold.cyan(label);
    } else if (level === 'warning') {
      return Chalk.bold.yellow(label);
    } else if(level === 'error') {
      return Chalk.bold.red(label);
    } else {
      return Chalk.bold.bgMagenta.whiteBright(label);
    }
  }
}

