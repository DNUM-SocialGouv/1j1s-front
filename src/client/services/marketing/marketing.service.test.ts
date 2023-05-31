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

		new AdformService(cookiesService);

		expect(cookiesService.addService).toHaveBeenCalledWith('adform');
	});
	it('set la valeur adformpm pour la campagne', () => {
		const cookiesService = aCookiesService();

		new AdformService(cookiesService);

		expect(cookiesService.addUser).toHaveBeenCalledWith('adformpm', 2867419);
	});
	it('reinitialise la valeur de pagename', () => {
		const cookiesService = aCookiesService();

		new AdformService(cookiesService);

		expect(cookiesService.addUser).toHaveBeenCalledWith('adformpagename', undefined);
	});
	describe('trackPage', () => {
		it('set la valeur de pagename', () => {
			const cookiesService = aCookiesService();
			const service = new AdformService(cookiesService);

			service.trackPage('2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage');

			expect(cookiesService.addUser).toHaveBeenCalledWith('adformpagename', '2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage');
		});
	});
});
