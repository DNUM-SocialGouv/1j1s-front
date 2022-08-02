import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';

import { LoggerService } from '~/client/services/logger.service';

jest.mock('@sentry/nextjs');

const SentryMock = jest.mocked(Sentry, true);
const SentryScopeMock = {
  setTag: jest.fn(),
} as unknown as Sentry.Scope;
SentryMock.configureScope.mockImplementation((callback) => {
  callback(SentryScopeMock);
});

describe('LoggerService', () => {
  const sessionId = 'ma-session-id';

  describe('error', () => {
    it('appelle le logger error avec les bons paramètres', () => {
      const loggerService = new LoggerService(sessionId);
      const message = 'mon erreur message';
      const category = 'message derreur';
      const expectedParameters: Sentry.Breadcrumb = {
        category,
        level: Sentry.Severity.Error,
        message,
      };

      loggerService.error(message, category);

      expect(SentryMock.addBreadcrumb).toHaveBeenCalledWith(expectedParameters);
    });
  });

  describe('info', () => {
    it('appelle le logger info avec les bons paramètres', () => {
      const loggerService = new LoggerService(sessionId);
      const message = 'mon info message';
      const category = 'message informatif';
      const expectedParameters: Sentry.Breadcrumb = {
        category,
        level: Sentry.Severity.Info,
        message,
      };

      loggerService.info(message, category);

      expect(SentryMock.addBreadcrumb).toHaveBeenCalledWith(expectedParameters);
    });
  });

  describe('warn', () => {
    it('appelle le logger warn avec les bons paramètres', () => {
      const loggerService = new LoggerService(sessionId);
      const message = 'mon warn message';
      const category = 'message de prévention';
      const expectedParameters: Sentry.Breadcrumb = {
        category,
        level: Sentry.Severity.Warning,
        message,
      };
      loggerService.warn(message, category);

      expect(SentryMock.addBreadcrumb).toHaveBeenCalledWith(expectedParameters);
    });
  });

  describe('setTransactionId', () => {
    const transactionId = 'ma-transaction-id';

    it('appelle setTag avec le transactionId', () => {
      const loggerService = new LoggerService(sessionId);

      loggerService.setTransactionId(transactionId);

      expect(SentryScopeMock.setTag).toHaveBeenCalledWith(
        'transaction_id',
        transactionId,
      );
    });
  });

  describe('captureMessage', () => {
    const message = 'mon message';
    const captureContext = CaptureContext.Severity.Error;

    it('appelle captureMessage avec les bons paramètres', () => {
      const loggerService = new LoggerService(sessionId);

      loggerService.captureMessage(message, captureContext);

      expect(SentryMock.captureMessage).toHaveBeenCalledWith(
        message, captureContext,
      );
    });
  });
});
