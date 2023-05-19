import { CookiesService } from '~/client/services/cookies/cookies.service';

export interface VideoService {}

export class YoutubeService implements VideoService {
	public static YOUTUBE_SERVICE = 'youtube';
	private readonly cookiesService: CookiesService;
	constructor(cookiesService: CookiesService) {
		this.cookiesService = cookiesService;
		this.cookiesService.addService(YoutubeService.YOUTUBE_SERVICE);
	}
}
