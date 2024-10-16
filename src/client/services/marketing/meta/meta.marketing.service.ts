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
				'use strict';
				if (!window.tarteaucitron.user.metaId) return;
				if (!window.fbq) {
					const n = window.fbq = function (...args: any[]) {
						n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
					};
					if (!window._fbq) {
						window._fbq = n;
					}
					n.push = n;
					n.loaded = !0;
					n.version = '2.0';
					n.queue = [];
				}

				window.tarteaucitron.addScript(`https://connect.facebook.net/${window.tarteaucitron.getLocale()}/fbevents.js`, '', function () {
					window.fbq('init', window.tarteaucitron.user.metaId);
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
