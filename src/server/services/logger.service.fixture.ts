import { LoggerService } from './logger.service';

export function aLoggerService(): LoggerService {
	return {
		error: vi.fn(),
		errorWithExtra: vi.fn(),
		fatalWithExtra: vi.fn(),
		info: vi.fn(),
		warn: vi.fn(),
		warnWithExtra: vi.fn(),
	};
}


