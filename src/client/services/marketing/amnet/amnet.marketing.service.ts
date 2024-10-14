import { CookiesService } from '../../cookies/cookies.service';
import { MarketingService } from '../marketing.service';

export default class AmnetMarketingService implements MarketingService {
	private cookieService: CookiesService;
	private static readonly amnetId = '0cfe1200-c50d-4658-a08d-8967a78bfaeb';

	constructor(cookieService: CookiesService) {
		this.cookieService = cookieService;
		const config = {
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
