// TODO à supprimer après la campagne autour de l'apprentissage
import { CookiesService } from '~/client/services/cookies/cookies.service';

export interface MarketingService {
  trackPage(pagename: string): void
}

export class AdformService implements MarketingService {
	private static ADFORM_SERVICE = 'adform';
	private static CLIENT_ID_1J1S = 2867419;
	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.cookiesService.addUser('adformpm', AdformService.CLIENT_ID_1J1S);
		this.cookiesService.addUser('adformpagename', undefined);
		this.cookiesService.addService(AdformService.ADFORM_SERVICE);
	}
	trackPage(pagename: string): void {
		this.cookiesService.addUser('adformpagename', pagename);
	}
}
