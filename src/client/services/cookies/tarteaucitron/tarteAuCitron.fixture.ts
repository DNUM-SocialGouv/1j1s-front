import { TarteAuCitron } from './tarteAuCitron.cookies.service';

export function aTarteAuCitron(override?: Partial<TarteAuCitron>): TarteAuCitron {
	return {
		init: jest.fn(),
		job: undefined,
		services: {},
		state: {},
		triggerJobsAfterAjaxCall: jest.fn(),
		user: {},
		userInterface: {
			openPanel: jest.fn(),
			respond: jest.fn(),
		},
		...override,
	};
}
