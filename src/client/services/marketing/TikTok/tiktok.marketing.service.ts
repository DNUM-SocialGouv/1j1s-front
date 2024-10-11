import { CookiesService } from '../../cookies/cookies.service';
import { MarketingService } from '../marketing.service';

export default class TiktokMarketingService implements MarketingService {
	private static SERVICE_NAME = 'tiktok';
	private static TIKTOK_ID = 'C90RBUPHLSUPN04HH210';

	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.cookiesService.addService(TiktokMarketingService.SERVICE_NAME);
	}

	trackPage(pagename: string): void {
		if (pagename === 'off') {
			this.cookiesService.addUser('tiktokId', undefined);
		}
		this.cookiesService.addUser('tiktokId', TiktokMarketingService.TIKTOK_ID);
	}
}
