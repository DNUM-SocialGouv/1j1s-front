import { aCookiesService } from '~/client/services/cookies/cookies.service.fixture';
import { YoutubeService } from '~/client/services/video/video.service';

describe('YoutubeService', () => {
	it("initialise le cookie à l'instanciation", () => {
		const cookiesService = aCookiesService();

		new YoutubeService(cookiesService);

		expect(cookiesService.addService).toHaveBeenCalledWith('youtube');
	});

	describe('isAllowed', () => {
		it('renvoie true quand les cookies sont acceptés', () => {
			const cookiesService = aCookiesService({ isServiceAllowed: () => true });
			const youtubeService = new YoutubeService(cookiesService);

			const result = youtubeService.isAllowed();

			expect(result).toBe(true);
		});
		it('renvoie false quand les cookies sont refusés', () => {
			const cookiesService = aCookiesService({ isServiceAllowed: () => false });
			const youtubeService = new YoutubeService(cookiesService);

			const result = youtubeService.isAllowed();

			expect(result).toBe(false);
		});
	});

	describe('allow', () => {
		it('appelle le service de cookies', () => {
			const cookiesService = aCookiesService();
			const youtubeService = new YoutubeService(cookiesService);

			youtubeService.allow();

			expect(cookiesService.allowService).toHaveBeenCalledTimes(1);
			expect(cookiesService.allowService).toHaveBeenCalledWith('youtube');
		});
	});
});
