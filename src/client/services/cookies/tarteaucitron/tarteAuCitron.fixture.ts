import { TarteAuCitron } from './tarteaucitron.cookies.service';

export function aTarteAuCitron(override?: Partial<TarteAuCitron>): TarteAuCitron {
	return {
		init: jest.fn(),
		job: undefined,
		services: {},
		state: {},
		user: {},
		userInterface: {
			openPanel: jest.fn(),
			respond: jest.fn(),
		},
		...override,
	};
}
