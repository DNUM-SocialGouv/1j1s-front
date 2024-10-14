import { CookiesService } from '../../cookies/cookies.service';
import { MarketingService } from '../marketing.service';

export default class AmnetMarketingService implements MarketingService {
	private cookieService: CookiesService;
	private static readonly amnetId = '0cfe1200-c50d-4658-a08d-8967a78bfaeb';
	private static readonly zemTagId = '118693';

	constructor(cookieService: CookiesService) {
		this.cookieService = cookieService;
		const config = {

			// FIXME ajouter cookies issus de adsrvr et de zemanta
			cookies: ['anj', 'icu', 'sess', 'uids', 'usersync', 'uuid2'],
			js: function () {
				'use strict';
				if (window.tarteaucitron.user.amnetId === undefined) {
					return;
				}
				// eslint-disable-next-line
				// @ts-ignore
				if (!window.pixie) {
					// eslint-disable-next-line
					// @ts-ignore
					const n = window.pixie = function (e, i, a) {
						// eslint-disable-next-line
						// @ts-ignore
						n.actionQueue.push({
							action: e,
							actionValue: i,
							params: a,
						});
					};
					// eslint-disable-next-line
					// @ts-ignore
					n.actionQueue = [];
				}

				// eslint-disable-next-line
				// @ts-ignore
				window.tarteaucitron.addScript('https://acdn.adnxs.com/dmp/up/pixie.js', '', function () {
					// eslint-disable-next-line
					// @ts-ignore
					window.pixie('init', window.tarteaucitron.user.amnetId);
					// eslint-disable-next-line
					// @ts-ignore
					window.pixie('event', 'PageView');
				});

				// eslint-disable-next-line
				// @ts-ignore
				window.tarteaucitron.addScript('https://js.adsrvr.org/up_loader.1.1.0.js', '', function () {
					// eslint-disable-next-line
					// @ts-ignore
					// eslint-disable-next-line
					ttd_dom_ready(function () {
						// eslint-disable-next-line
						// @ts-ignore
						// eslint-disable-next-line
						if (typeof TTDUniversalPixelApi === 'function') {
							// eslint-disable-next-line
							// @ts-ignore
							// eslint-disable-next-line
							const universalPixelApi = new TTDUniversalPixelApi();
							universalPixelApi.init('qj8wadw', ['muuud1z'], 'https://insight.adsrvr.org/track/up');
						}
					});
				});


				// eslint-disable-next-line
				// @ts-ignore
				if (window.zemApi) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const toArray = function (object: any) {
						return Object.prototype.toString.call(object) === '[object Array]' ? object : [object];
					};

					// eslint-disable-next-line
					// @ts-ignore
					window.zemApi.marketerId = toArray(window.zemApi.marketerId).concat(toArray(AmnetMarketingService.zemTagId));
					return;
				}

				// eslint-disable-next-line
				// @ts-ignore
				// eslint-disable-next-line
				const api = window.zemApi = function (...args: any[]) {

					// eslint-disable-next-line
					// @ts-ignore
					// eslint-disable-next-line
					api.dispatch ? api.dispatch.apply(api, args) : api.queue.push(args);
				};
				// eslint-disable-next-line
				// @ts-ignore
				window.zemApi.version = '1.0';
				// eslint-disable-next-line
				// @ts-ignore
				window.zemApi.loaded = true;
				// eslint-disable-next-line
				// @ts-ignore
				window.zemApi.marketerId = AmnetMarketingService.zemTagId;
				// eslint-disable-next-line
				// @ts-ignore
				window.zemApi.queue = [];

				// eslint-disable-next-line
				// @ts-ignore
				window.tarteaucitron.addScript('https://js-tag.zemanta.com/zcpt.js', '', function () {
					// eslint-disable-next-line
					// @ts-ignore
					window.zemApi('track', 'PAGE_VIEW');
				});
			},
			key: 'amnet',
			name: 'Amnet',
			needConsent: true,
			type: 'ads',
			uri: 'https://support.google.com/displayvideo/topic/3528231?hl=en&ref_topic=9059505&sjid=9933903973918710720-EU',
		};

		this.cookieService.addService('amnet', config);
	}

	trackPage(pagename: string): void {
		if (pagename === 'off') {
			this.cookieService.addUser('amnetId', undefined);
		} else {
			this.cookieService.addUser('amnetId', AmnetMarketingService.amnetId);
		}
	}
}
