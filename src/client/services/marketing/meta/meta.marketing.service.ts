/* eslint-disable */
// @ts-nocheck

import { CookiesService } from '../../cookies/cookies.service';
import { MarketingService } from '../marketing.service';

export default class MetaMarketingService implements MarketingService {
	private cookieService: CookiesService;
	private static readonly metaId = '523325854541523';

	constructor(cookieService: CookiesService) {
		this.cookieService = cookieService;
		const config = {

			cookies: ['xs', 'sb', 'fr', 'datr', 'dpr', 'c_user', '_fbp'],
			js: function () {

				if (location.pathname === '/choisir-apprentissage') {
					const pixel = document.createElement('img');
					pixel.src = `https://www.facebook.com/tr?id=${MetaMarketingService.metaId}&ev=PageView&noscript=1`;
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
			key: 'meta',
			name: 'Meta',
			needConsent: true,
			type: 'ads',
			uri: 'https://www.facebook.com/privacy/policies/cookies/',
		};

		this.cookieService.addService('meta', config);
	}

	trackPage(pagename: string): void {
	}
}
