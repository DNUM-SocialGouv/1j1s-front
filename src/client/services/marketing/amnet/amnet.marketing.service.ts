// eslint-disable
import { CookiesService } from '~/client/services/cookies/cookies.service';

import { TarteAuCitron } from '../../cookies/tarteaucitron/tarteAuCitron.cookies.service';
import { MarketingService } from '../marketing.service';

export default class AmnetMarketingService implements MarketingService {
	static readonly SERVICE_NAME = 'amnet';
	static readonly ZEMANTA_TAG_ID = '118693';
	static readonly TTD_ADVERTISER_ID = 'qj8wadw';
	static readonly TTD_TAG_ID = 'muuud1z';

	constructor(private readonly cookiesService: CookiesService) {
    type ConfigObject = unknown;
    const config: TarteAuCitron.ServiceConfig<ConfigObject> = {
    	cookies: [],
    	fallback: function () {
    		// @ts-expect-error
    		window.zemApi = function() {};
    	},
    	js: function () {
    		'use strict';
    		(function Zemanta() {
    			// @ts-expect-error
    			window.tarteaucitron.addScript('https://js-tag.zemanta.com/zcpt.js');
    			// @ts-expect-error
    			window.zemApi = function(...args) {
    				// @ts-expect-error
    				window.zemApi.dispatch
    				// @ts-expect-error
    				// eslint-disable-next-line prefer-spread
    					? window.zemApi.dispatch.apply(window.zemApi, args)
    				// @ts-expect-error
    					: window.zemApi.queue.push(args);
    			};
    			// @ts-expect-error
    			window.zemApi.version = '1.0';
    			// @ts-expect-error
    			window.zemApi.loaded = true;
    			// @ts-expect-error
    			window.zemApi.marketerId = AmnetMarketingService.ZEMANTA_TAG_ID;
    			// @ts-expect-error
    			window.zemApi.queue = [];
    		})();
    		(function TTD() {
    			// @ts-expect-error
    			window.tarteaucitron.addScript('https://js.adsrvr.org/up_loader.1.1.0.js', '', () => {
    				// @ts-expect-error
    				window.tarteaucitron.sendEvent('amnet_ready');
    			});
    		})();
    	},
    	key: AmnetMarketingService.SERVICE_NAME,
    	name: 'Amnet',
    	needConsent: true,
    	type: 'ads',
    	uri: 'https://www.outbrain.com/privacy/cookies/',
    };
    this.cookiesService.addService(AmnetMarketingService.SERVICE_NAME, config);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	trackPage(pagename: string): void {
		function sendAnalytics() {
			// @ts-expect-error
			window.zemApi('track', 'PAGE_VIEW');
			// @ts-expect-error
			window.ttd_dom_ready(function() {
				// @ts-expect-error
				if (typeof window.TTDUniversalPixelApi === 'function') {
					// @ts-expect-error
					const universalPixelApi = new window.TTDUniversalPixelApi();
					universalPixelApi.init(AmnetMarketingService.TTD_ADVERTISER_ID, [AmnetMarketingService.TTD_TAG_ID], 'https://insight.adsrvr.org/track/up');
				}
			});
		}
		// @ts-expect-error
		if (window.zemApi && window.ttd_dom_ready) {
			sendAnalytics();
		} else {
			document.addEventListener('amnet_ready', () => {
				sendAnalytics();
			}, { once: true });
		}

	}
}
