/**
 * @jest-environment jsdom
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AnalyticsService } from '~/client/services/analytics/analytics.service';

describe('AnalyticsService', () => {
	const pageSetSpy = jest.fn();
	const initSpy = jest.fn();
	const eulerianAnalyticsPushSpy = jest.fn();

	beforeEach(() => {
		(global as any).tarteaucitron = {
			init: initSpy,
			job: [],
			services: {},
			user: {},
		};
		(global as any).EA_push = eulerianAnalyticsPushSpy;
	});

	afterEach(() => {
		initSpy.mockRestore();
		eulerianAnalyticsPushSpy.mockRestore();
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
			serviceDefaultState: true,
			showAlertSmall: false,
			showIcon: true,
			useExternalCss: false,
			useExternalJs: false,
		};

		new AnalyticsService();

		expect(initSpy).toHaveBeenCalledWith(expectedCookiesSettings);
	});

	describe('trackPageView', () => {
		describe('quand le consentement est autorisé', () => {
			beforeEach(() => {
				document.cookie = 'consentement=!eulerian=true;';
			});

			it('envoie un événement page au tracking', () => {
				const analyticsService = new AnalyticsService();
				analyticsService.trackPageView('emplois');
				const expected = [
					'site_entity',
					'Min. Santé',
					'site_environment',
					'dev',
					'site_target',
					'information',
					'site_type',
					'multiple',
					'page_template',
					'emplois_liste',
					'pagegroup',
					'emplois',
					'pagelabel',
					'emplois_liste',
					'segment-site',
					'offres_d_emploi',
				];

				expect(eulerianAnalyticsPushSpy).toHaveBeenCalledWith(expected);
			});
		});

		describe('quand le consentement n’est pas autorisé', () => {
			beforeEach(() => {
				document.cookie = 'consentement=!eulerian=false';
			});

			it('n’envoie aucun événement page au tracking', () => {
				const analyticsService = new AnalyticsService();
				analyticsService.trackPageView('emplois');

				expect(pageSetSpy).not.toHaveBeenCalled();
			});
		});
	});
});
