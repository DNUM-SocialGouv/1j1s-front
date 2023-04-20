import { LoggerService } from './logger.service';

export function aLoggerService(): LoggerService {
	return {
		error: jest.fn(),
		errorWithExtra: jest.fn(),
		info: jest.fn(),
		warn: jest.fn(),
		warnWithExtra: jest.fn(),
	} as unknown as LoggerService;
};


