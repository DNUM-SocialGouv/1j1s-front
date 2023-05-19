import { CookiesService } from '~/client/services/cookies/cookies.service';

export interface VideoService {
	isAllowed(): boolean;
}

export class YoutubeService implements VideoService {
	public static SERVICE_NAME = 'youtube';
	private readonly cookiesService: CookiesService;
	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.cookiesService.addService(YoutubeService.SERVICE_NAME);
	}

	isAllowed(): boolean {
		return this.cookiesService.isServiceAllowed(YoutubeService.SERVICE_NAME);
	}
}
