/**
 * @jest-environment jsdom
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AnalyticsProdService } from '~/client/services/analytics/analytics.prod.service';

describe('AnalyticsProdService', () => {
	const pageSetSpy = jest.fn();
	const clickSendSpy = jest.fn();
	const dispatchSpy = jest.fn();
	const initSpy = jest.fn();
	const tagSpy = jest.fn().mockReturnValue({
		click: { send: clickSendSpy },
		dispatch: dispatchSpy,
		page: { set: pageSetSpy },
	});

	beforeEach(() => {
		(global as any).tarteaucitron = {
			init: initSpy,
			job: [],
			user: {},
		};
		(global as any).ATInternet = {
			Tracker : {
				Tag: tagSpy,
			},
		};
	});

	afterEach(() => {
		pageSetSpy.mockRestore();
		clickSendSpy.mockRestore();
		dispatchSpy.mockRestore();
		initSpy.mockRestore();
	});

	it('initialise le consentement des cookies et le tracker', () => {
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
			serviceDefaultState: false,
			showAlertSmall: false,
			showIcon: true,
			useExternalCss: false,
			useExternalJs: false,
		};

		new AnalyticsProdService();

		expect(tagSpy).toHaveBeenCalled();
		// Toggle test when cookie consent is needed
		expect(initSpy).not.toHaveBeenCalledWith(expectedCookiesSettings);
	});

	describe('sendPage', () => {
		describe('quand le consentement est autorisé', () => {
			beforeEach(() => {
				document.cookie = 'consentement=!atinternet=true';
			});

			it('envoie un événement page au tracking', () => {
				const page = '/emplois';

				const analyticsService = new AnalyticsProdService();
				analyticsService.sendPage(page);

				expect(pageSetSpy).toHaveBeenCalledWith({ name: page });
			});
		});

		describe('quand le consentement n‘est pas autorisé', () => {
			beforeEach(() => {
				document.cookie = 'consentement=!atinternet=false';
			});

			it('n‘envoie aucun événement page au tracking', () => {
				const page = '/emplois';

				const analyticsService = new AnalyticsProdService();
				analyticsService.sendPage(page);

				expect(pageSetSpy).not.toHaveBeenCalled();
			});
		});
	});

	describe('sendClick', () => {
		describe('quand le consentement est autorisé', () => {
			beforeEach(() => {
				document.cookie = 'consentement=!atinternet=true';
			});

			it('envoie un événement click au tracking', () => {
				const action = 'click';

				const analyticsService = new AnalyticsProdService();
				analyticsService.sendClick(action);

				expect(clickSendSpy).toHaveBeenCalledWith({ name: action });
			});
		});

		describe('quand le consentement n‘est pas autorisé', () => {
			beforeEach(() => {
				document.cookie = 'consentement=!atinternet=false';
			});

			it('n‘envoie aucun événement click au tracking', () => {
				const action = 'click';

				const analyticsService = new AnalyticsProdService();
				analyticsService.sendClick(action);

				expect(clickSendSpy).not.toHaveBeenCalled();
			});
		});
	});
});
