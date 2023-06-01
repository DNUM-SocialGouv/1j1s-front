import { aCookiesService } from '~/client/services/cookies/cookies.service.fixture';
import FailedToAllowServiceError from '~/client/services/cookies/FailedToAllowService.error';
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
		it('ouvre le panel quand impossible d’accepter le cookie', () => {
			const cookiesService = aCookiesService({ allowService: () => { throw new FailedToAllowServiceError('youtube', 'bouton introuvable'); } });
			const youtubeService = new YoutubeService(cookiesService);

			youtubeService.allow();

			expect(cookiesService.openPanel).toHaveBeenCalledTimes(1);
		});
		it('n’ouvre pas le panel quand possible d’accepter le cookie', () => {
			const cookiesService = aCookiesService({ allowService: jest.fn() });
			const youtubeService = new YoutubeService(cookiesService);

			youtubeService.allow();

			expect(cookiesService.openPanel).not.toHaveBeenCalled();
		});
		it('fait passe-plat sur les autres erreurs', () => {
			const cookiesService = aCookiesService({ allowService: () => { throw new Error('Something failed'); } });
			const youtubeService = new YoutubeService(cookiesService);

			expect(() => youtubeService.allow()).toThrow(new Error('Something failed'));
		});
	});
});
