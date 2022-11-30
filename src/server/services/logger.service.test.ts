import * as Sentry from '@sentry/nextjs';

import { LoggerService } from '~/server/services/logger.service';

jest.mock('@sentry/nextjs');

const SentryMock = jest.mocked(Sentry, true);
const SentryScopeMock = {
  setTag: jest.fn(),
} as unknown as Sentry.Scope;
SentryMock.configureScope.mockImplementation((callback) => {
  callback(SentryScopeMock);
});

describe('LoggerService', () => {
  describe('error', () => {
    it('appelle le logger error avec les bons paramètres', () => {
      const message = 'mon erreur message';
      LoggerService.error(message);

      expect(SentryMock.captureMessage).toHaveBeenCalledWith(message, 'error');
    });
  });

  describe('info', () => {
    it('appelle le logger info avec les bons paramètres', () => {
      const message = 'mon info message';
      LoggerService.info(message);

      expect(SentryMock.captureMessage).toHaveBeenCalledWith(message, 'info');
    });
  });

  describe('warn', () => {
    it('appelle le logger warn avec les bons paramètres', () => {
      const message = 'mon warn message';
      LoggerService.warn(message);

      expect(SentryMock.captureMessage).toHaveBeenCalledWith(message, 'warning');
    });
  });
});
