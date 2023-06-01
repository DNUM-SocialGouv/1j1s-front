/**
 * @jest-environment jsdom
 */

import { aTarteAuCitron } from '~/client/services/cookies/tarteaucitron/tarteaucitron.fixture';

import FailedToAllowServiceError from '../FailedToAllowService.error';
import { TarteaucitronCookiesService } from './tarteaucitron.cookies.service';

describe('TarteAuCitronCookiesService', () => {
	it('initialise tarteaucitron quand on instantie le service', () => {
		const tarteaucitron = aTarteAuCitron();

		new TarteaucitronCookiesService(tarteaucitron);

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

		new TarteaucitronCookiesService(tarteaucitron);

		expect(tarteaucitron.job).toEqual(['youtube']);
	});

	describe('addService', () => {
		it('ajoute le service à la liste', () => {
			const tarteaucitron = aTarteAuCitron();
			const cookieService = new TarteaucitronCookiesService(tarteaucitron);

			cookieService.addService('youtube');

			expect(tarteaucitron.job).toEqual(['youtube']);
		});
		it('ajoute le service à la liste avec la configuration', () => {
			const tarteaucitron = aTarteAuCitron();
			const cookieService = new TarteaucitronCookiesService(tarteaucitron);

			cookieService.addService('eulerian', { config: 'truc' });

			expect(tarteaucitron.job).toEqual(['eulerian']);
			expect(tarteaucitron.services).toEqual({ eulerian: { config: 'truc' } });
		});
		it('n’écrase pas la config par défaut quand pas de config fournie', () => {
			const tarteaucitron = aTarteAuCitron({ services: { youtube: { config: 'test' } } });
			const cookieService = new TarteaucitronCookiesService(tarteaucitron);

			cookieService.addService('youtube');

			expect(tarteaucitron.services['youtube']).toEqual({ config: 'test' });
		});
	});

	describe('addUser', () => {
		it("ajoute l'utilisateur à la liste des utilisateurs", () => {
			const tarteaucitron = aTarteAuCitron({ user: {} });
			const cookiesService = new TarteaucitronCookiesService(tarteaucitron);

			cookiesService.addUser('adformpm', 2867419);

			expect(tarteaucitron.user).toMatchObject({ adformpm: 2867419 });
		});
		it("écrase l'utilisateur quand il est déjà présent", () => {
			const tarteaucitron = aTarteAuCitron({ user: { adformpm: 'salut' } });
			const cookiesService = new TarteaucitronCookiesService(tarteaucitron);

			cookiesService.addUser('adformpm', 2867419);

			expect(tarteaucitron.user.adformpm).toEqual(2867419);
		});
	});

	describe('isServiceAllowed', () => {
		it('renvoie true si le service est accepté', () => {
			document.cookie = 'consentement=!youtube=true;';
			const tarteaucitron = aTarteAuCitron();
			const cookiesService = new TarteaucitronCookiesService(tarteaucitron);

			const result = cookiesService.isServiceAllowed('youtube');

			expect(result).toBe(true);
		});
		it('renvoie false si le service est refusé', () => {
			document.cookie = 'consentement=!youtube=false;';
			const tarteaucitron = aTarteAuCitron();
			const cookiesService = new TarteaucitronCookiesService(tarteaucitron);

			const result = cookiesService.isServiceAllowed('youtube');

			expect(result).toBe(false);
		});
		it('renvoie false si le service n’existe pas', () => {
			document.cookie = 'consentement=!eulerian=true;';
			const tarteaucitron = aTarteAuCitron();
			const cookiesService = new TarteaucitronCookiesService(tarteaucitron);

			const result = cookiesService.isServiceAllowed('youtube');

			expect(result).toBe(false);
		});
		it('renvoie false si pas de consentement', () => {
			document.cookie = '';
			const tarteaucitron = aTarteAuCitron();
			const cookiesService = new TarteaucitronCookiesService(tarteaucitron);

			const result = cookiesService.isServiceAllowed('youtube');

			expect(result).toBe(false);
		});
		it.each`
			  cookie    																																																						| expected
				${'consentement=!youtube=true!eulerian=false!adform=true'} 																														| ${false}
				${'aaa=bbb; consentement=!youtube=true!eulerian=true; aaa=bbb; eulerian=false;'} 																			| ${true}
				${'aa=consentement=!eulerian=true; consentement=!youtube=true!eulerian=false!adform=true; aa=consentement=!youtube'} 	| ${false}
				${'consentement=!eulerian=true; '} 																																										| ${true}
		`('renvoie $expected quand le cookie vaut $cookie', ({ cookie, expected }) => {
			document.cookie = cookie;
			const tarteaucitron = aTarteAuCitron();
			const cookiesService = new TarteaucitronCookiesService(tarteaucitron);

			const result = cookiesService.isServiceAllowed('eulerian');

			expect(result).toBe(expected);
		});

		beforeEach(() => {
			// FIXME (GAFI 19-05-2023): Si on inject document (qui est une dépendance externe) on peut se passer de ça et de l'environnement js-dom
			Object.defineProperty(document, 'cookie', { value: undefined, writable: true });
		});
	});

	describe('allowService', () => {
		it('accepte le cookie', () => {
			const tarteaucitron = aTarteAuCitron();
			const service = new TarteaucitronCookiesService(tarteaucitron);
			const boutonAllowYoutube = document.createElement('button');
			boutonAllowYoutube.setAttribute('id', 'youtubeAllowed');
			document.body.append(boutonAllowYoutube);

			service.allowService('youtube');

			expect(tarteaucitron.userInterface.respond).toHaveBeenCalledTimes(1);
			expect(tarteaucitron.userInterface.respond).toHaveBeenCalledWith(boutonAllowYoutube, true);
		});
		it('throw quand le service ne peut pas être accepté', () => {
			const tarteaucitron = aTarteAuCitron();
			const service = new TarteaucitronCookiesService(tarteaucitron);
			document.body.innerHTML = '';

			const allowService = () => service.allowService('youtube');

			expect(allowService).toThrow(/^Impossible d'accepter les cookies du service youtube : bouton introuvable$/);
			expect(allowService).toThrow(FailedToAllowServiceError);
		});
	});

	describe('openPanel', () => {
		it('ouvre le panel', () => {
			const tarteaucitron = aTarteAuCitron({ userInterface: { openPanel: jest.fn(), respond: jest.fn() } });
			const service = new TarteaucitronCookiesService(tarteaucitron);

			service.openPanel();

			expect(tarteaucitron.userInterface.openPanel).toHaveBeenCalledTimes(1);
		});
	});
});
