import * as Sentry from '@sentry/nextjs';

export class LoggerService {
	constructor(sessionId?: string) {
		Sentry.getCurrentScope().setTag('session_id', sessionId);
	}

	private static log(
		message: string,
		level: Sentry.SeverityLevel,
	) {
		Sentry.captureMessage(message, level);
	}

	info(message: string) {
		LoggerService.log(message, 'info');
	}

	warn(message: string) {
		LoggerService.log(message, 'warning');
	}

	error(message: string) {
		LoggerService.log(message, 'error');
	}

	setTransactionId(transactionId: string): void {
		Sentry.getCurrentScope().setTag('transaction_id', transactionId);
	}
}
