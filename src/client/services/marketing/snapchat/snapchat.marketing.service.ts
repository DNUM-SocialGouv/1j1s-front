// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CookiesService } from '~/client/services/cookies/cookies.service';
import { TarteAuCitron } from '~/client/services/cookies/tarteaucitron/tarteAuCitron.cookies.service';

import { MarketingService } from '../marketing.service';

export default class SnapchatMarketingService implements MarketingService {
	private static SERVICE_NAME = 'snapchat-custom';
	private ready = false;

	constructor(private readonly cookiesService: CookiesService) {
		this.cookiesService.addUser('snapchatId', 'd48efe29-caa9-4f0c-86e8-353fc35a8b3f');
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const service = this;
		// eslint-disable-next-line
		type ConfigObject = any;
		const config: TarteAuCitron.ServiceConfig<ConfigObject> = {
			cookies: [],
			js: function () {
				'use strict';

				// eslint-disable-next-line no-undef
				if (tarteaucitron.user.snapchatId === undefined) {
					return;
				}

				const a = window.snaptr = function () {
					// eslint-disable-next-line prefer-rest-params, prefer-spread
					a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments);
				};
				a.queue = [];
				// eslint-disable-next-line no-undef
				window.snaptr('init', tarteaucitron.user.snapchatId, {});

				// eslint-disable-next-line no-undef
				tarteaucitron.addScript('https://sc-static.net/scevent.min.js', undefined, () => {
					service.ready = true;
					document.dispatchEvent(new CustomEvent('snapchat_ready'));
				});

				// eslint-disable-next-line no-undef
				if (typeof tarteaucitron.user.snapchatMore === 'function') {
					// eslint-disable-next-line no-undef
					tarteaucitron.user.snapchatMore();
				}
			},
			key: SnapchatMarketingService.SERVICE_NAME,
			name: 'Snapchat',
			needConsent: true,
			type: 'analytic',
			uri: 'https://snap.com/fr-FR/privacy/privacy-policy',
		};
		this.cookiesService.addService(SnapchatMarketingService.SERVICE_NAME, config);
	}

	// eslint-disable-next-line
	trackPage(pagename: string): void {
		const cookiesService = this.cookiesService;
		function sendAnalytics() {
			if (!cookiesService.isServiceAllowed(SnapchatMarketingService.SERVICE_NAME)) { return; }

			window.snaptr('track', 'PAGE_VIEW');
		}
		if (this.ready) {
			sendAnalytics();
		} else {
			document.addEventListener('snapchat_ready', sendAnalytics);
		}
	}
}
