/**
 * @jest-environment jsdom
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PageTags } from '~/client/services/analytics/analytics';
import { EulerianService } from '~/client/services/analytics/analytics.service';
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

describe('EulerianService', () => {
	const pageSetSpy = jest.fn();
	const eulerianAnalyticsPushSpy = jest.fn();
	beforeEach(() => {
		(global as any).EA_push = eulerianAnalyticsPushSpy;
		mockLocation();
	});

	afterEach(() => {
		eulerianAnalyticsPushSpy.mockRestore();
	});

	describe('initialiserAnalyticsCampagneDeCommunication', () => {
		it('initialise le service adform', () => {
			const cookiesService = aCookiesService();

			new EulerianService(cookiesService);

			expect(cookiesService.addService).toHaveBeenCalledWith('adform');
		});
		it('set la valeur adformpm pour la campagne', () => {
			const cookiesService = aCookiesService();

			new EulerianService(cookiesService);

			expect(cookiesService.addUser).toHaveBeenCalledWith('adformpm', 2867419);
		});
		describe('quand on est pas sur la page de campagne jeune', () => {
			it('la valeur de pagename ne doit pas être définie', () => {
				window.location.pathname = '/';
				const cookiesService = aCookiesService();

				new EulerianService(cookiesService);

				expect(cookiesService.addUser).toHaveBeenCalledWith('adformpagename', undefined);
			});
		});
		describe('quand on est sur la page de campagne jeune', () => {
			it('la valeur de pagename ne doit pas être définie', () => {
				window.location.pathname = '/choisir-apprentissage';
				const cookiesService = aCookiesService();

				new EulerianService(cookiesService);

				expect(cookiesService.addUser).toHaveBeenCalledWith('adformpagename', '2023-04-1jeune1solution.gouv.fr-PageArrivee-ChoisirApprentissage');
			});
		});
	});

	describe('envoyerAnalyticsPageVue', () => {
		describe('quand le consentement est autorisé', () => {
			beforeEach(() => {
				document.cookie = 'consentement=!eulerian=true;';
			});

			it('envoie un événement page au tracking', () => {
				const analyticsService = new EulerianService(aCookiesService());
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
				const analyticsService = new EulerianService(aCookiesService());
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
