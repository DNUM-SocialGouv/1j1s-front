import { CookiesService } from '~/client/services/cookies/cookies.service';
import GoogleTagManagerService from '~/client/services/marketing/googleTagManager.service';

import { TarteAuCitron } from '../../cookies/tarteaucitron/tarteAuCitron.cookies.service';
import { MarketingService } from '../marketing.service';

export default class SeedtagMarketingService implements MarketingService {
	static readonly SEEDTAG_SERVICE_NAME = 'seedtag';
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
				const promise = gtagService.mount();
				promise.then(() => {
					// eslint-disable-next-line
					// @ts-ignore
					window.gtag('config', GoogleTagManagerService.ADS_ID);
					service.ready = true;
					document.dispatchEvent(new CustomEvent('seedtag_ready'));
				});
			},
			key: SeedtagMarketingService.SEEDTAG_SERVICE_NAME,
			name: 'Seedtag',
			needConsent: true,
			type: 'ads',
			uri: 'https://www.seedtag.com/fr/cookies-policy/',
		};
		this.cookiesService.addService(SeedtagMarketingService.SEEDTAG_SERVICE_NAME, config);
	}

	// eslint-disable-next-line
	trackPage(pagename: string): void {
		const cookiesService = this.cookiesService;
		function sendAnalytics() {
			if (!cookiesService.isServiceAllowed(SeedtagMarketingService.SEEDTAG_SERVICE_NAME)) { return; }
			// eslint-disable-next-line
			// @ts-ignore
			window.gtag('event', 'conversion', {
				allow_custom_scripts: true,
				send_to: `${GoogleTagManagerService.ADS_ID}/invmedia/fr_ga005+standard`,
				u2: '[URL_Info]',
			});
		}
		if (!this.cookiesService.isServiceAllowed(SeedtagMarketingService.SEEDTAG_SERVICE_NAME)) { return; }

		if (this.ready) {
			sendAnalytics();
		} else {
			document.addEventListener('seedtag_ready', sendAnalytics, { once: true });
		}
	}
}
