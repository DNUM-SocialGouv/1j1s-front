import { CookiesService } from '../../cookies/cookies.service';
import { MarketingService } from '../marketing.service';

export default class MetaMarketingService implements MarketingService {
	private cookieService: CookiesService;
	private static readonly metaId = '523325854541523';

	constructor(cookieService: CookiesService) {
		this.cookieService = cookieService;
		const config = {

			cookies: ['xs', 'sb', 'fr', 'datr', 'dpr', 'c_user'],
			js: function () {
				'use strict';
				// eslint-disable-next-line
				// @ts-ignore
				if (!window.fbq) {
					// eslint-disable-next-line
					// @ts-ignore
					// eslint-disable-next-line
					const n = window.fbq = function (...args: any[]) {
						// eslint-disable-next-line
						// @ts-ignore
						// eslint-disable-next-line
						n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
					};
					// eslint-disable-next-line
					// @ts-ignore
					if (!window._fbq) {
						// eslint-disable-next-line
						// @ts-ignore
						window._fbq = n;
					}
					// eslint-disable-next-line
					// @ts-ignore
					n.push = n;
					// eslint-disable-next-line
					// @ts-ignore
					n.loaded = !0;
					// eslint-disable-next-line
					// @ts-ignore
					n.version = '2.0';
					// eslint-disable-next-line
					// @ts-ignore
					n.queue = [];
				}

				// eslint-disable-next-line
				// @ts-ignore
				window.tarteaucitron.addScript(`https://connect.facebook.net/${window.tarteaucitron.getLocale()}/fbevents.js`, '', function () {
					// eslint-disable-next-line
					// @ts-ignore
					window.fbq('init', window.tarteaucitron.user.metaId);
					// eslint-disable-next-line
					// @ts-ignore
					window.fbq('track', 'PageView');
				});
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
		if (pagename === 'off') {
			this.cookieService.addUser('metaId', undefined);
		} else {
			this.cookieService.addUser('metaId', MetaMarketingService.metaId);
		}
	}
}
