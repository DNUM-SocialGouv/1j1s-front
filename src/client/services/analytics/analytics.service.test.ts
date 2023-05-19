/**
 * @jest-environment jsdom
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PageTags } from '~/client/services/analytics/analytics';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { aCookiesService } from '~/client/services/cookies/cookies.service.fixture';

const mockLocation = () => {
	const mockResponse = jest.fn();
	Object.defineProperty(window, 'location', {
		value: {
			assign: mockResponse,
			hash: {
				endsWith: mockResponse,
				includes: mockResponse,
			},
		},
		writable: true,
	});
};

describe('AnalyticsService', () => {
	const pageSetSpy = jest.fn();
	const initSpy = jest.fn();
	const eulerianAnalyticsPushSpy = jest.fn();
	const cookiesService = aCookiesService();

	beforeEach(() => {
		(global as any).tarteaucitron = {
			init: initSpy,
			job: [],
			services: {},
			user: {},
		};
		(global as any).EA_push = eulerianAnalyticsPushSpy;
		mockLocation();
	});

	afterEach(() => {
		initSpy.mockRestore();
		eulerianAnalyticsPushSpy.mockRestore();
	});

	describe('initialiserAnalyticsCampagneDeCommunication', () => {
		it('initialise le service adform', () => {
			new AnalyticsService(cookiesService);

			expect(window.tarteaucitron.job).toContainEqual('adform');
		});
		it('set la valeur adformpm pour la campagne', () => {
			new AnalyticsService(cookiesService);

			expect(window.tarteaucitron.user.adformpm).toEqual(2867419);
		});
		describe('quand on est pas sur la page de campagne jeune', () => {
			it('la valeur de pagename ne doit pas être définie', () => {
				window.location.pathname = '/';

				new AnalyticsService(cookiesService);

				expect(window.tarteaucitron.user.adformpagename).toEqual(undefined);

			});
		});
		describe('quand on est sur la page de campagne jeune', () => {
			it('la valeur de pagename ne doit pas être définie', () => {
				window.location.pathname = '/choisir-apprentissage';

				new AnalyticsService(cookiesService);

				expect(window.tarteaucitron.user.adformpagename).toEqual('2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage');
			});
		});
	});

	describe('initialiserYoutube', () => {
		it('initialise le service youtube', () => {
			new AnalyticsService(cookiesService);

			expect(window.tarteaucitron.job).toContainEqual('youtube');
		});
	});

	describe('envoyerAnalyticsPageVue', () => {
		describe('quand le consentement est autorisé', () => {
			beforeEach(() => {
				document.cookie = 'consentement=!eulerian=true;';
			});

			it('envoie un événement page au tracking', () => {
				const analyticsService = new AnalyticsService(cookiesService);
				const analyticsPageConfig: PageTags = {
					page_template: 'emplois_liste',
					pagegroup: 'emplois',
					pagelabel: 'emplois_liste',
					'segment-site': 'offres_d_emploi',
				};
				analyticsService.envoyerAnalyticsPageVue(analyticsPageConfig);
				const expected = [
					'site_entity',
					'Min. Travail',
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
				const analyticsService = new AnalyticsService(cookiesService);
				const analyticsPageConfig: PageTags = {
					page_template: 'emplois_liste',
					pagegroup: 'emplois',
					pagelabel: 'emplois_liste',
					'segment-site': 'offres_d_emploi',
				};
				analyticsService.envoyerAnalyticsPageVue(analyticsPageConfig);

				expect(pageSetSpy).not.toHaveBeenCalled();
			});
		});
	});
});
