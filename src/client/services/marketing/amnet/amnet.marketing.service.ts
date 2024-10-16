/* eslint-disable */
// @ts-nocheck

import { CookiesService } from '../../cookies/cookies.service';
import { MarketingService } from '../marketing.service';

export default class AmnetMarketingService implements MarketingService {
	private cookieService: CookiesService;
	private static readonly xandrId = '0cfe1200-c50d-4658-a08d-8967a78bfaeb';
	private static readonly zemTagId = '118693';

	private addXandr() {
		this.cookieService.addService('xandr');
	}
	private addOutbrain() {
		const config = {
			// FIXME ajouter cookies issus de zemanta
			cookies: ['anj', 'icu', 'sess', 'uids', 'usersync', 'uuid2'],
			js: function () {
				'use strict';
				if (!window.tarteaucitron.user.xandrId) return;
				const pixel = document.createElement('img');
				pixel.src = `https://p1.zemanta.com/v2/p/ns/${AmnetMarketingService.zemTagId}/PAGE_VIEW/`;
				pixel.width = 1;
				pixel.height = 1;
				pixel.alt = '';
				pixel.referrerPolicy = 'no-referrer-when-downgrade';
				pixel.setAttribute('style', 'position: absolute; transform: translateX(-101%);');
				document.body.prepend(pixel);
				document.addEventListener('navigate', () => {
					pixel.remove();
				});
			},
			key: 'amnet-outbrain',
			name: 'Amnet - Outbrain',
			needConsent: true,
			type: 'ads',
			uri: 'https://support.google.com/displayvideo/topic/3528231?hl=en&ref_topic=9059505&sjid=9933903973918710720-EU',
		};
		this.cookieService.addService('amnet-outbrain', config);
	}
	private addAdsrvr() {
		const config = {
			// FIXME ajouter cookies issus de adsrvr
			cookies: ['anj', 'icu', 'sess', 'uids', 'usersync', 'uuid2'],
			js: function () {
				'use strict';
				if (!window.tarteaucitron.user.xandrId) return;
				window.tarteaucitron.addScript('https://js.adsrvr.org/up_loader.1.1.0.js', '', function () {
					ttd_dom_ready(function () {
						if (typeof TTDUniversalPixelApi === 'function') {
							const universalPixelApi = new TTDUniversalPixelApi();
							universalPixelApi.init('qj8wadw', ['muuud1z'], 'https://insight.adsrvr.org/track/up');
						}
					});
				});
			},
			key: 'adsrvr',
			name: 'Amnet - Adsrvr',
			needConsent: true,
			type: 'ads',
			uri: 'https://support.google.com/displayvideo/topic/3528231?hl=en&ref_topic=9059505&sjid=9933903973918710720-EU',
		};

		this.cookieService.addService('adsrvr', config);
	}

	constructor(cookieService: CookiesService) {
		this.cookieService = cookieService;
		this.addAdsrvr();
		this.addOutbrain();
		this.addXandr();
	}

	trackPage(pagename: string): void {
		if (pagename === 'off') {
			this.cookieService.addUser('xandrId', undefined);
		} else {
			this.cookieService.addUser('xandrId', AmnetMarketingService.xandrId);
		}
	}
}
