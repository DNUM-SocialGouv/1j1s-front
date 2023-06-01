/**
 * @jest-environment jsdom
 */

import { aCookiesService } from '~/client/services/cookies/cookies.service.fixture';

import { PageTags } from '../analytics';
import { EulerianAnalyticsService } from './eulerian.analytics.service';

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
	const eulerianAnalyticsPushSpy = jest.fn();
	beforeEach(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(global as any).EA_push = eulerianAnalyticsPushSpy;
		mockLocation();
	});

	afterEach(() => {
		eulerianAnalyticsPushSpy.mockRestore();
	});

	describe('envoyerAnalyticsPageVue', () => {
		describe('quand le consentement est autorisé', () => {
			it('envoie un événement page au tracking', () => {
				const analyticsService = new EulerianAnalyticsService(aCookiesService());
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
				const cookiesService = aCookiesService({ isServiceAllowed: () => false });
				const analyticsService = new EulerianAnalyticsService(cookiesService);
				const analyticsPageConfig: PageTags = {
					page_template: 'emplois_liste',
					pagegroup: 'emplois',
					pagelabel: 'emplois_liste',
					'segment-site': 'offres_d_emploi',
				};

				analyticsService.envoyerAnalyticsPageVue(analyticsPageConfig);

				expect(eulerianAnalyticsPushSpy).not.toHaveBeenCalled();
			});
		});
	});
});
