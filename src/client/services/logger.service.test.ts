import { mockCaptureMessage, mockGetCurrentScope } from '~/client/components/sentry-nextjs.mock';
import { LoggerService } from '~/client/services/logger.service';

describe('LoggerService', () => {
	const sessionId = 'ma-session-id';
	const captureMessage = vi.fn();

	beforeEach(() => {
		mockCaptureMessage(captureMessage);
	  mockGetCurrentScope({});
	});
	afterEach(() => {
	  vi.clearAllMocks();
	});
	describe('error', () => {
		it('appelle le logger error avec les bons paramètres', () => {
			const loggerService = new LoggerService(sessionId);
			const message = 'mon erreur message';
			loggerService.error(message);

			expect(captureMessage).toHaveBeenCalledWith(message, 'error');
		});
	});

	describe('info', () => {
		it('appelle le logger info avec les bons paramètres', () => {
			const loggerService = new LoggerService(sessionId);
			const message = 'mon info message';
			loggerService.info(message);

			expect(captureMessage).toHaveBeenCalledWith(message, 'info');
		});
	});

	describe('warn', () => {
		it('appelle le logger warn avec les bons paramètres', () => {
			const loggerService = new LoggerService(sessionId);
			const message = 'mon warn message';
			loggerService.warn(message);

			expect(captureMessage).toHaveBeenCalledWith(message, 'warning');
		});
	});

	describe('setTransactionId', () => {

		it('appelle setTag avec le transactionId', () => {
			const mockSetTag = vi.fn();
			mockGetCurrentScope({ setTag: mockSetTag });
			
			const transactionId = 'ma-transaction-id';
			const loggerService = new LoggerService(sessionId);

			loggerService.setTransactionId(transactionId);

			expect(mockSetTag).toHaveBeenCalledWith(
				'transaction_id',
				transactionId,
			);
		});
	});
});
