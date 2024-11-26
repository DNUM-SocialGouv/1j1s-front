import { CookiesService } from './cookies.service';

export function aCookiesService(override?: Partial<CookiesService>): CookiesService {
	return {
		addService: jest.fn(),
		addUser: jest.fn(),
		allowService: jest.fn(),
		isServiceAllowed: jest.fn(() => true),
		openPanel: jest.fn(),
		...override,
	};
}
