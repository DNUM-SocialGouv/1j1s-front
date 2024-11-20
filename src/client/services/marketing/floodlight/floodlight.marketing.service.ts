import { CookiesService } from '~/client/services/cookies/cookies.service';
import { TarteAuCitron } from '~/client/services/cookies/tarteaucitron/tarteAuCitron.cookies.service';

import GoogleTagManagerService from '../googleTagManager.service';
import { MarketingService } from '../marketing.service';

export default class FloodlightMarketingService implements MarketingService {
	static readonly SERVICE_NAME = 'floodlight';
	private ready = false;

	constructor(private readonly cookiesService: CookiesService, private readonly gtagService: GoogleTagManagerService) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const service = this;
		// eslint-disable-next-line
		type ConfigObject = any;
		const config: TarteAuCitron.ServiceConfig<ConfigObject> = {
			cookies: this.gtagService.cookies(),
			js: function () {
				'use strict';
				gtagService.mount().then(() => {
					// eslint-disable-next-line
					// @ts-ignore
					window.gtag('config', GoogleTagManagerService.ADS_ID);
					service.ready = true;
					document.dispatchEvent(new CustomEvent('floodlight_ready'));
				});
			},
			key: FloodlightMarketingService.SERVICE_NAME,
			name: 'Floodlight',
			needConsent: true,
			type: 'ads',
			uri: 'https://policies.google.com/technologies/cookies',
		};
		this.cookiesService.addService(FloodlightMarketingService.SERVICE_NAME, config);
	}

	// eslint-disable-next-line
	trackPage(pagename: string): void {
		const cookiesService = this.cookiesService;
		function sendAnalytics() {
			if (!cookiesService.isServiceAllowed(FloodlightMarketingService.SERVICE_NAME)) { return; }

			// eslint-disable-next-line
			// @ts-ignore
			window.gtag('event', 'conversion', {
				allow_custom_scripts: true,
				send_to: 'DC-3048978/appre0/24appren+unique',
				u1: '[URL]',
			});
		}
		if (this.ready) {
			sendAnalytics();
		} else {
			document.addEventListener('floodlight_ready', sendAnalytics, { once: true });
		}
	}
}
