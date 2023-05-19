import { aCookiesService } from '~/client/services/cookies/cookies.service.fixture';
import { YoutubeService } from '~/client/services/video/video.service';

describe('YoutubeService', () => {
	it("initialise le cookie à l'instanciation", () => {
		const cookiesService = aCookiesService();
		new YoutubeService(cookiesService);

		expect(cookiesService.addService).toHaveBeenCalledWith('youtube');
	});
});
