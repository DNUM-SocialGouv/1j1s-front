// eslint-disable
import { CookiesService } from '~/client/services/cookies/cookies.service';

import { TarteAuCitron } from '../../cookies/tarteaucitron/tarteAuCitron.cookies.service';
import { MarketingService } from '../marketing.service';

export default class AmnetMarketingService implements MarketingService {
	static readonly SERVICE_NAME = 'amnet';
	static readonly TAG_ID = '118693';

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
    		// @ts-expect-error
    		window.tarteaucitron.addScript('//js-tag.zemanta.com/zcpt.js');
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
    		window.zemApi.marketerId = AmnetMarketingService.TAG_ID;
    		// @ts-expect-error
    		window.zemApi.queue = [];
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
		// @ts-expect-error
		window.zemApi('track', 'PAGE_VIEW');
	}
}
