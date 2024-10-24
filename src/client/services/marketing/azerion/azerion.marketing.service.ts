import { CookiesService } from '../../cookies/cookies.service';
import { MarketingService } from '../marketing.service';

export default class AzerionMarketingService implements MarketingService {
	private cookieService: CookiesService;
	constructor(cookieService: CookiesService) {
		this.cookieService = cookieService;
		const config = {
			cookies: ['XANDR_PANID', 'uuid2'],
			js: function () {
				'use strict';
				if (location.pathname === '/apprentissage-entreprises') {
					const pixel = document.createElement('img');
					pixel.src = 'https://secure.adnxs.com/px?id=1824703&t=2';
					pixel.width = 1;
					pixel.height = 1;
					pixel.alt = '';
					pixel.setAttribute('style', 'position: absolute; transform: translateX(-101%);');
					document.body.prepend(pixel);
					document.addEventListener('navigate', () => {
						pixel.remove();
					});
				}
			},
			key: 'azerion',
			name: 'Azerion',
			needConsent: true,
			type: 'ads',
			uri: 'https://www.azerion.com/azerion-global-corporate-cookie-notice/',
		};
		this.cookieService.addService('azerion', config);
	}
	trackPage(): void {
	}
}
