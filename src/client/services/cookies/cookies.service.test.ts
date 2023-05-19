/**
 * @jest-environment jsdom
 */

import { TarteAuCitronService } from '~/client/services/cookies/cookies.service';
import { aTarteAuCitron } from '~/client/services/cookies/cookies.service.fixture';

describe('TarteAuCitronService', () => {
	it('initialise tarteaucitron quand on instantie le service', () => {
		const tarteaucitron = aTarteAuCitron();

		new TarteAuCitronService(tarteaucitron);

		expect(tarteaucitron.init).toHaveBeenCalledTimes(1);
		expect(tarteaucitron.init).toHaveBeenCalledWith({
			AcceptAllCta: true,
			DenyAllCta: true,
			adblocker: false,
			bodyPosition: 'bottom',
			closePopup: false,
			cookieName: 'consentement',
			cookieslist: true,
			groupServices: false,
			handleBrowserDNTRequest: false,
			hashtag: '#tarteaucitron',
			highPrivacy: true,
			iconPosition: 'BottomLeft',
			iconSrc: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAxQzE1LjMxMzcgMSAxOCAzLjY4NjI5IDE4IDdWOEgyMEMyMC41NTIzIDggMjEgOC40NDc3MiAyMSA5VjIxQzIxIDIxLjU1MjMgMjAuNTUyMyAyMiAyMCAyMkg0QzMuNDQ3NzIgMjIgMyAyMS41NTIzIDMgMjFWOUMzIDguNDQ3NzIgMy40NDc3MiA4IDQgOEg2VjdDNiAzLjY4NjI5IDguNjg2MjkgMSAxMiAxWk0xOSAxMEg2VjIwSDE5VjEwWk05IDE3VjE5SDdWMTdIOVpNOSAxNFYxNkg3VjE0SDlaTTkgMTFWMTNIN1YxMUg5Wk0xMiAzQzkuNzkwODYgMyA4IDQuNzkwODYgOCA3VjhIMTZWN0MxNiA0Ljc5MDg2IDE0LjIwOTEgMyAxMiAzWiIgZmlsbD0iIzAwMDA5MSIvPgo8L3N2Zz4K',
			mandatory: true,
			mandatoryCta: true,
			moreInfoLink: true,
			orientation: 'middle',
			privacyUrl: '/confidentialite',
			readmoreLink: '/confidentialite',
			removeCredit: true,
			serviceDefaultState: 'wait',
			showAlertSmall: false,
			showIcon: true,
			useExternalCss: false,
			useExternalJs: false,
		});
		expect(tarteaucitron.job).toEqual([]);
	});
	it('n’écrase pas les jobs quand présents', () => {
		const tarteaucitron = aTarteAuCitron({ job: ['youtube'] });

		new TarteAuCitronService(tarteaucitron);

		expect(tarteaucitron.job).toEqual(['youtube']);
	});

	describe('addService', () => {
		it('ajoute le service à la liste', () => {
			const tarteaucitron = aTarteAuCitron();
			const cookieService = new TarteAuCitronService(tarteaucitron);

			cookieService.addService('youtube');

			expect(tarteaucitron.job).toEqual(['youtube']);
		});
		it('ajoute le service à la liste avec la configuration', () => {
			const tarteaucitron = aTarteAuCitron();
			const cookieService = new TarteAuCitronService(tarteaucitron);

			cookieService.addService('eulerian', { config: 'truc' });

			expect(tarteaucitron.job).toEqual(['eulerian']);
			expect(tarteaucitron.services).toEqual({ eulerian: { config: 'truc' } });
		});
		it('n’écrase pas la config par défaut quand pas de config fournie', () => {
			const tarteaucitron = aTarteAuCitron({ services: { youtube: { config: 'test' } } });
			const cookieService = new TarteAuCitronService(tarteaucitron);

			cookieService.addService('youtube');

			expect(tarteaucitron.services['youtube']).toEqual({ config: 'test' });
		});
	});

	describe('addUser', () => {
		it("ajoute l'utilisateur à la liste des utilisateurs", () => {
			const tarteaucitron = aTarteAuCitron({ user: {} });
			const cookiesService = new TarteAuCitronService(tarteaucitron);

			cookiesService.addUser('adformpm', 2867419);

			expect(tarteaucitron.user).toMatchObject({ adformpm: 2867419 });
		});
		it("écrase l'utilisateur quand il est déjà présent", () => {
			const tarteaucitron = aTarteAuCitron({ user: { adformpm: 'salut' } });
			const cookiesService = new TarteAuCitronService(tarteaucitron);

			cookiesService.addUser('adformpm', 2867419);

			expect(tarteaucitron.user.adformpm).toEqual(2867419);
		});
	});
});
