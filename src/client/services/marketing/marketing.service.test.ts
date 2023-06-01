/**
 * @jest-environment jsdom
 */

import { aCookiesService } from '~/client/services/cookies/cookies.service.fixture';
import { AdformService } from '~/client/services/marketing/marketing.service';

const mockLocation = () => {
	const mockResponse = jest.fn();
	Object.defineProperty(window, 'location', {
		value: {
			assign: mockResponse,
			hash: {
				endsWith: mockResponse,
				includes: mockResponse,
			},
		},
		writable: true,
	});
};

describe('AdformService', () => {
	beforeEach(() => {
		mockLocation();
	});

	it('initialise le service adform', () => {
		const cookiesService = aCookiesService();
		const ID_1J1S = 2867419;

		new AdformService(cookiesService);

		expect(cookiesService.addService).toHaveBeenCalledWith('adform');
		expect(cookiesService.addUser).toHaveBeenCalledWith('adformpm', ID_1J1S);
		expect(cookiesService.addUser).toHaveBeenCalledWith('adformpagename', undefined);
	});

	describe('trackPage', () => {
		it('configure le cookie pour envoyer les données vers la bonne page', () => {
			const cookiesService = aCookiesService();
			const service = new AdformService(cookiesService);

			service.trackPage('2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage');

			expect(cookiesService.addUser).toHaveBeenCalledWith('adformpagename', '2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage');
		});
	});
});
