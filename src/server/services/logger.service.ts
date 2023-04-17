import { SentryException } from '~/server/exceptions/sentryException';

export interface LoggerService {
	info(msg: string): void
	warn(msg: string): void
	error(msg: string): void
	warnWithExtra(exception: SentryException): void
	errorWithExtra(exception: SentryException): void
}
