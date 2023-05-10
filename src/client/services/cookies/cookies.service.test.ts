/**
 * @jest-environment jsdom
 */

import { TarteAuCitronService } from '~/client/services/cookies/cookies.service';

describe('CookiesService', () => {
	const initSpy = jest.fn();
	beforeEach(() => {
		(global as Record<string, unknown>).tarteaucitron = {
			init: initSpy,
			job: [],
			services: {},
			user: {},
		};
	});

	it('initialise tarteaucitron', () => {
		const expectedCookiesSettings = {
			AcceptAllCta : true,
			DenyAllCta : true,
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
			serviceDefaultState: true,
			showAlertSmall: false,
			showIcon: true,
			useExternalCss: false,
			useExternalJs: false,
		};

		new TarteAuCitronService();

		expect(initSpy).toHaveBeenCalledWith(expectedCookiesSettings);
	});

	it('renvoie true lorsque le cookie est accepté', () => {
		const service = new TarteAuCitronService();
		document.cookie = 'consentement=!tracking=true';

		const cookieAccepte = service.isCookieAccepted('tracking');

		expect(cookieAccepte).toBe(true);
	});

	it('renvoie false lorsque le cookie est explicitement refusé', () => {
		const service = new TarteAuCitronService();
		document.cookie = 'consentement=!tracking=false';

		const cookieAccepte = service.isCookieAccepted('tracking');

		expect(cookieAccepte).toBe(false);
	});

	it('renvoie false lorsque le cookie n’est pas renseigné', () => {
		const service = new TarteAuCitronService();
		document.cookie = 'consentement=';

		const cookieAccepte = service.isCookieAccepted('tracking');

		expect(cookieAccepte).toBe(false);
	});

	it('push le job quand on ajoute un cookie au gestionnaire', () => {
		const service = new TarteAuCitronService();

		service.addCookie('tracking', {});

		expect(window.tarteaucitron.services['tracking']).toEqual({});
		expect(window.tarteaucitron.job).toContain('tracking');
	});
});
