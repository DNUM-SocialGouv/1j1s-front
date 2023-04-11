import pino from 'pino';

import { SentryException } from '~/server/exceptions/sentryException';
import { Logger, PinoLoggerService } from '~/server/services/logger.service';

jest.mock('pino');

const pinoMock = jest.mocked(pino);
const mockedLogger: Logger = {
	debug: jest.fn(),
	error: jest.fn(),
	fatal: jest.fn(),
	info: jest.fn(),
	trace: jest.fn(),
	warn: jest.fn(),
};
pinoMock.mockImplementation(() => mockedLogger as pino.Logger);


describe('PinoLoggerService', () => {
	describe('error', () => {
		it('appelle le logger error avec le message passé en paramètre', () => {
			const loggerService = new PinoLoggerService('https://12345@sentry.fabrique.social.gouv.fr/79', 'error');

			loggerService.error('mon erreur message');

			expect(mockedLogger.error).toHaveBeenCalledWith({ msg: 'mon erreur message' });
		});
	});

	describe('info', () => {
		it('appelle le logger info avec le message passé en paramètre', () => {
			const loggerService = new PinoLoggerService('https://12345@sentry.fabrique.social.gouv.fr/79', 'error');

			loggerService.info('mon info message');

			expect(mockedLogger.info).toHaveBeenCalledWith({ msg: 'mon info message' });
		});
	});

	describe('warn', () => {
		it('appelle le logger warn avec le message passé en paramètre', () => {
			const loggerService = new PinoLoggerService('https://12345@sentry.fabrique.social.gouv.fr/79', 'warn');

			loggerService.warn('mon warn message');

			expect(mockedLogger.warn).toHaveBeenCalledWith({ msg: 'mon warn message' });
		});
	});

	describe('warnWithExtra', () => {
		it('appelle le logger warn avec le message, les bons tags et les extras', () => {
			const loggerService = new PinoLoggerService('https://12345@sentry.fabrique.social.gouv.fr/79', 'warn');

			loggerService.warnWithExtra(new SentryException(
				'impossible d’effectuer une recherche',
				{ context: 'GET stages', source: 'API LeBonStage' },
				{ stacktrace: 'response is undefined at line 32...' },
			));

			expect(mockedLogger.warn).toHaveBeenCalledWith({ extra: { stacktrace: 'response is undefined at line 32...' }, msg: 'impossible d’effectuer une recherche', tags: { context: 'GET stages', source: 'API LeBonStage' } });
		});
	});

	describe('errorWithExtra', () => {
		it('appelle le logger error avec le message, les bons tags et les extras', () => {
			const loggerService = new PinoLoggerService('https://12345@sentry.fabrique.social.gouv.fr/79', 'error');

			loggerService.errorWithExtra(new SentryException(
				'impossible d’effectuer une recherche',
				{ context: 'GET stages', source: 'API LeBonStage' },
				{ stacktrace: 'response is undefined at line 32...' },
			));

			expect(mockedLogger.error).toHaveBeenCalledWith({ extra: { stacktrace: 'response is undefined at line 32...' }, msg: 'impossible d’effectuer une recherche', tags: { context: 'GET stages', source: 'API LeBonStage' } });
		});
	});
});
