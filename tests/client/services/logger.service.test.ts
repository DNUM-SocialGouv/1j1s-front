import * as Sentry from "@sentry/nextjs";
import { Breadcrumb } from "@sentry/nextjs";

import { LoggerService } from "../../../src/client/services/logger.service";

jest.mock("@sentry/nextjs", () => {
  return {
    Severity: {
      Error: "error",
      Info: "info",
      Warning: "warning",
    },
    addBreadcrumb: jest.fn(),
    configureScope: jest.fn(),
  };
});

const SentryMockScope = {
  setTag: jest.fn(),
};
Sentry.configureScope.mockImplementation((callback) => {
  callback(SentryMockScope);
});

describe("LoggerService", () => {
  const sessionId = "ma-session-id";

  describe("error", () => {
    it("appelle le logger error avec les bons paramètres", () => {
      const loggerService = new LoggerService(sessionId);
      const message = "mon erreur message";
      const category = "message derreur";
      const expectedParameters: Breadcrumb = {
        category,
        level: Sentry.Severity.Error,
        message,
      };

      loggerService.error(message, category);

      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith(expectedParameters);
    });
  });

  describe("info", () => {
    it("appelle le logger info avec les bons paramètres", () => {
      const loggerService = new LoggerService(sessionId);
      const message = "mon info message";
      const category = "message informatif";
      const expectedParameters: Breadcrumb = {
        category,
        level: Sentry.Severity.Info,
        message,
      };

      loggerService.info(message, category);

      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith(expectedParameters);
    });
  });

  describe("warn", () => {
    it("appelle le logger warn avec les bons paramètres", () => {
      const loggerService = new LoggerService(sessionId);
      const message = "mon warn message";
      const category = "message de prévention";
      const expectedParameters: Breadcrumb = {
        category,
        level: Sentry.Severity.Warning,
        message,
      };
      loggerService.warn(message, category);

      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith(expectedParameters);
    });
  });

  describe("setTransactionId", () => {
    const transactionId = "ma-transaction-id";

    it("appelle setTag avec le transactionId", () => {
      const loggerService = new LoggerService(sessionId);

      loggerService.setTransactionId(transactionId);

      expect(SentryMockScope.setTag).toHaveBeenCalledWith(
        "transaction_id",
        transactionId
      );
    });
  });
});
