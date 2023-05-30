import { CookiesService } from '~/client/services/cookies/cookies.service';
import FailedToAllowServiceError from '~/client/services/cookies/FailedToAllowService.error';

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
		try {
			return this.cookiesService.allowService('youtube');
		} catch (error) {
			if (error instanceof FailedToAllowServiceError) {
				return this.cookiesService.openPanel();
			} else {
				throw error;
			}
		}
	}
}
