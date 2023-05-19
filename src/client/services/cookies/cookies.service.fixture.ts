import { CookiesService, TarteAuCitron } from './cookies.service';

export function aCookiesService(override?: Partial<CookiesService>): CookiesService {
	return {
		addService: jest.fn(),
		...override,
	};
}

export function aTarteAuCitron(override?: Partial<TarteAuCitron>): TarteAuCitron {
	return {
		init: jest.fn(),
		job: undefined,
		services: {},
		userInterface: {
			respond: jest.fn(),
		},
		...override,
	};
}
