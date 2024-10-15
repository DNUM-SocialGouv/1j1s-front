/* eslint-disable */
// @ts-nocheck

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


				const pixel = document.createElement('img');
				pixel.src = 'https://p1.zemanta.com/v2/p/ns/118693/PAGE_VIEW/';
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
