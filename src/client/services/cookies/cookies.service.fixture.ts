import { CookiesService } from './cookies.service.interface';
import { TarteAuCitron } from './tarteaucitron.service';

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

export function aTarteAuCitron(override?: Partial<TarteAuCitron>): TarteAuCitron {
	return {
		init: jest.fn(),
		job: undefined,
		services: {},
		user: {},
		userInterface: {
			openPanel: jest.fn(),
			respond: jest.fn(),
		},
		...override,
	};
}
