// TODO à supprimer après la campagne autour de l'apprentissage
import { CookiesService } from '~/client/services/cookies/cookies.service';

export interface MarketingService {
  trackPage(pagename: string): void
}

export class AdformService implements MarketingService {
	private static ADFORM_SERVICE = 'adform';
	private static CLIENT_TRACKING_ID = 2867419;
	private readonly cookiesService: CookiesService;

	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.initialiserAnalyticsCampagneDeCommunication();
	}

	private initialiserAnalyticsCampagneDeCommunication(): void {
		this.cookiesService.addUser('adformpm', AdformService.CLIENT_TRACKING_ID);
		// FIXME (GAFI 19-05-2023): plutôt dans la page que dans le service
		if (window.location.pathname === '/choisir-apprentissage') {
			const pagename = '2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage';
			this.cookiesService.addUser('adformpagename', pagename);
		} else {
			this.cookiesService.addUser('adformpagename', undefined);
		}

		this.cookiesService.addService(AdformService.ADFORM_SERVICE);
	}

	trackPage(pagename: string): void {
		this.cookiesService.addUser('adformpagename', pagename);
	}
}
