import { CookiesService } from '../../cookies/cookies.service';
import { MarketingService } from '../marketing.service';

export default class AmnetMarketingService implements MarketingService {
	private cookieService: CookiesService;

	constructor(cookieService: CookiesService) {
		this.cookieService = cookieService;
		const config = {
			key: 'xandr',
			name: 'Amnet',
			type: /* FIXME (GAFI 11-10-2024): */ 'ads',
			uri: /* FIXME (GAFI 11-10-2024): */ 'https://www.xandr.com/privacy/cookie-policy/',
		};
		this.cookieService.addService('xandr', config);
	}

	trackPage(pagename: string): void {
		if (pagename === 'off') {
			this.cookieService.addUser('xandrId', undefined);
		} else {
			this.cookieService.addUser('xandrId', '0cfe1200-c50d-4658-a08d-8967a78bfaeb');
		}
	}
}
