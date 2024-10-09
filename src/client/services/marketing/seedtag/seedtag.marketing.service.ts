import { CookiesService } from '~/client/services/cookies/cookies.service';

import { TarteAuCitron } from '../../cookies/tarteaucitron/tarteAuCitron.cookies.service';
import { MarketingService } from '../marketing.service';

export default class SeedtagMarketingService implements MarketingService {
	static readonly SEEDTAG_SERVICE_NAME = 'seedtag';
	static readonly ADS_ID = 'DC-10089018';

	constructor(private readonly cookiesService: CookiesService) {
		// eslint-disable-next-line
		type ConfigObject = any;
		const config: TarteAuCitron.ServiceConfig<ConfigObject> = {
			cookies: (function () {
				// eslint-disable-next-line
				let googleIdentifier = SeedtagMarketingService.ADS_ID,
					tagUaCookie = '_gat_gtag_' + googleIdentifier,
					tagGCookie = '_ga_' + googleIdentifier;

				tagUaCookie = tagUaCookie.replace(/-/g, '_');
				tagGCookie = tagGCookie.replace(/G-/g, '');

				return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
			})(),
			js: function () {
				'use strict';
				// eslint-disable-next-line
				// @ts-ignore
				window.dataLayer = window.dataLayer || [];
				// eslint-disable-next-line
				// @ts-ignore
				window.tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + SeedtagMarketingService.ADS_ID, '', function () {
					// eslint-disable-next-line
					// @ts-ignore
					// eslint-disable-next-line
					window.gtag = function gtag() { dataLayer.push(arguments); };
					// eslint-disable-next-line
					// @ts-ignore
					// eslint-disable-next-line
					gtag('js', new Date());
					// eslint-disable-next-line
					// @ts-ignore
					// eslint-disable-next-line
					const additional_config_info = (timeExpire !== undefined) ? { anonymize_ip: true, cookie_expires: timeExpire / 1000 } : { anonymize_ip: true };

					// eslint-disable-next-line
					// @ts-ignore
					// eslint-disable-next-line
					gtag('config', SeedtagMarketingService.ADS_ID, additional_config_info);

					// eslint-disable-next-line
					// @ts-ignore
					// eslint-disable-next-line
					if (typeof tarteaucitron.user.googleadsMore === 'function') {
						// eslint-disable-next-line
						// @ts-ignore
						// eslint-disable-next-line
						tarteaucitron.user.googleadsMore();
					}
					document.dispatchEvent(new CustomEvent('seedtag_ready'));
				});
			},
			key: SeedtagMarketingService.SEEDTAG_SERVICE_NAME,
			name: 'Seedtag',
			needConsent: true,
			type: 'ads',
			uri: /* FIXME (GAFI 08-10-2024): */  'https://eulerian.com/vie-privee',
		};
		this.cookiesService.addService(SeedtagMarketingService.SEEDTAG_SERVICE_NAME, config);
	}

	// eslint-disable-next-line
	trackPage(pagename: string): void {
		function sendAnalytics() {
			// eslint-disable-next-line
			// @ts-ignore
			window.gtag('event', 'conversion', {
				allow_custom_scripts: true,
				send_to: `${SeedtagMarketingService.ADS_ID}/invmedia/gae_d0+standard`,
				u2: '[URL_Info]',
			});

		}
		document.addEventListener(`${SeedtagMarketingService.SEEDTAG_SERVICE_NAME}_ready`, sendAnalytics);
		// document.addEventListener(`${SeedtagMarketingService.SEEDTAG_SERVICE_NAME}_loaded`, sendAnalytics);
		// document.addEventListener(`${SeedtagMarketingService.SEEDTAG_SERVICE_NAME}_added`, sendAnalytics);
	}
}
