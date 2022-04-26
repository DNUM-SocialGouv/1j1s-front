import * as Sentry from '@sentry/nextjs';
import { Breadcrumb } from '@sentry/nextjs';

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
      const category = 'message derreur';
      const expectedParameters: Breadcrumb = {
        category,
        level: Sentry.Severity.Error,
        message,
      };

      LoggerService.error(message, category);

      expect(SentryMock.addBreadcrumb).toHaveBeenCalledWith(expectedParameters);
    });
  });

  describe('info', () => {
    it('appelle le logger info avec les bons paramètres', () => {
      const message = 'mon info message';
      const category = 'message informatif';
      const expectedParameters: Breadcrumb = {
        category,
        level: Sentry.Severity.Info,
        message,
      };

      LoggerService.info(message, category);

      expect(SentryMock.addBreadcrumb).toHaveBeenCalledWith(expectedParameters);
    });
  });

  describe('warn', () => {
    it('appelle le logger warn avec les bons paramètres', () => {
      const message = 'mon warn message';
      const category = 'message de prévention';
      const expectedParameters: Breadcrumb = {
        category,
        level: Sentry.Severity.Warning,
        message,
      };
      LoggerService.warn(message, category);

      expect(SentryMock.addBreadcrumb).toHaveBeenCalledWith(expectedParameters);
    });
  });
});
