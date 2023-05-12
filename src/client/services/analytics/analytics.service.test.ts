/**
 * @jest-environment jsdom
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { PageTags } from '~/client/services/analytics/analytics';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { aCookieService } from '~/client/services/cookies/cookies.service.fixture';

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

	describe('envoyerAnalyticsPageVue', () => {
		describe('quand le consentement est autorisé', () => {
			it('envoie un événement page au tracking', () => {
				const cookiesService = aCookieService({
					isCookieAccepted(): boolean {
						return true;
					},
				});
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
			it('n’envoie aucun événement page au tracking', () => {
				const cookiesService = aCookieService({
					isCookieAccepted(): boolean {
						return true;
					},
				});
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
		it("ajoute le cookie au manager à l'instanciation", () => {
			const cookiesService = aCookieService({ addCookie: jest.fn() });

			new AnalyticsService(cookiesService);

			expect(cookiesService).toHaveBeenCalledTimes(1);
		});
	});
});
