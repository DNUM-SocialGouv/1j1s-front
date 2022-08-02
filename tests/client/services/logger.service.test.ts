import * as Sentry from '@sentry/nextjs';

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
      loggerService.error(message);

      expect(SentryMock.captureMessage).toHaveBeenCalledWith(message, 'error');
    });
  });

  describe('info', () => {
    it('appelle le logger info avec les bons paramètres', () => {
      const loggerService = new LoggerService(sessionId);
      const message = 'mon info message';
      loggerService.info(message);

      expect(SentryMock.captureMessage).toHaveBeenCalledWith(message, 'info');
    });
  });

  describe('warn', () => {
    it('appelle le logger warn avec les bons paramètres', () => {
      const loggerService = new LoggerService(sessionId);
      const message = 'mon warn message';
      loggerService.warn(message);

      expect(SentryMock.captureMessage).toHaveBeenCalledWith(message, 'warning');
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
});
