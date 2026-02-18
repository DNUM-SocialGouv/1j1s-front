import { aCookiesService } from '~/client/services/cookies/cookies.service.fixture';

import { MatomoTagManagerAnalyticsService } from './matomoTagManager.analytics.service';

describe('MatomoTagManagerAnalyticsService', () => {
	process.env.NEXT_PUBLIC_ANALYTICS_MATOMO_TAG_MANAGER_CUSTOM_JS_PATH = 'tagManager.js';
	it('initialise le service matomo', () => {
		const cookiesService = aCookiesService();

		new MatomoTagManagerAnalyticsService(cookiesService);

		expect(cookiesService.addService).toHaveBeenCalledWith('matomotm');
		expect(cookiesService.addUser).toHaveBeenCalledWith('matomotmUrl', 'tagManager.js');
	});

	it('recupère l‘autorisation de l‘utilisateur', () => {
		const cookiesService = aCookiesService({
			isServiceAllowed: vi.fn(),
		});
		vi.spyOn(cookiesService, 'isServiceAllowed').mockReturnValue(true);
		const matomoTmService = new MatomoTagManagerAnalyticsService(cookiesService);

		const isAllowed = matomoTmService.isAllowed();

		expect(isAllowed).toBe(true);
		expect(cookiesService.isServiceAllowed).toHaveBeenCalledTimes(1);
		expect(cookiesService.isServiceAllowed).toHaveBeenCalledWith('matomotm');
	});
});
