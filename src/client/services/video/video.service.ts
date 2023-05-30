import { CookiesService } from '~/client/services/cookies/cookies.service';

export interface VideoService {
	isAllowed(): boolean;
	allow(): void;
}

export class YoutubeService implements VideoService {
	private static SERVICE_NAME = 'youtube';
	private readonly cookiesService: CookiesService;
	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.cookiesService.addService(YoutubeService.SERVICE_NAME);
	}

	isAllowed(): boolean {
		return this.cookiesService.isServiceAllowed(YoutubeService.SERVICE_NAME);
	}

	allow(): void {
		return this.cookiesService.allowService('youtube');
	}
}
