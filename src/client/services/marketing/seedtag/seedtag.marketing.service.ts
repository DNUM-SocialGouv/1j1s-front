// eslint-disable
import { CookiesService } from '~/client/services/cookies/cookies.service';

import { TarteAuCitron } from '../../cookies/tarteaucitron/tarteAuCitron.cookies.service';
import { MarketingService } from '../marketing.service';

export default class SeedtagMarketingService implements MarketingService {
	static readonly SEEDTAG_SERVICE_NAME = 'seedtag';
	static readonly GOOGLE_ADS_ID = 'DC-10089018';

	constructor(private readonly cookiesService: CookiesService) {
    type ConfigObject = unknown;
    const config: TarteAuCitron.ServiceConfig<ConfigObject> = {
    	cookies: [
    		'_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz',
    		`_gat_gtag_${SeedtagMarketingService.GOOGLE_ADS_ID}`,
    		`_ga_${SeedtagMarketingService.GOOGLE_ADS_ID}`,
    		'_gcl_au',
    	],
    	fallback: function () {
    		// @ts-expect-error
    		window.dataLayer = window.dataLayer || [];
    		// @ts-expect-error
    		function gtag(...args){ window.dataLayer.push(args); }
    		// @ts-expect-error
    		window.gtag = gtag;
    	},
    	js: function () {
    		'use strict';
    		// @ts-expect-error
    		window.tarteaucitron.addScript(`https://www.googletagmanager.com/gtag/js?id=${SeedtagMarketingService.GOOGLE_ADS_ID}`);
    		// @ts-expect-error
    		window.dataLayer = window.dataLayer || [];
    		// @ts-expect-error
    		function gtag(...args){ window.dataLayer.push(args); }
    		// @ts-expect-error
    		window.gtag = gtag;
    		gtag('js', new Date());
    		gtag('config', SeedtagMarketingService.GOOGLE_ADS_ID);
    	},
    	key: SeedtagMarketingService.SEEDTAG_SERVICE_NAME,
    	name: 'Seedtag',
    	needConsent: true,
    	type: 'ads',
    	uri: 'https://www.seedtag.com/fr/cookies-policy/',
    };
    this.cookiesService.addService(SeedtagMarketingService.SEEDTAG_SERVICE_NAME, config);
	}

	trackPage(pagename: string): void {
		function sendAnalytics() {
			// @ts-expect-error
			window.gtag('event', 'conversion', {
				allow_custom_scripts: true,
				send_to: 'DC-10089018/invmedia/fr_di0+standard',
				u2: pagename,
			});
		}
		// @ts-expect-error
		if (window.gtag) {
			sendAnalytics();
		} else {
			document.addEventListener('seedtag_loaded', sendAnalytics, { once: true });
		}
	}
}
