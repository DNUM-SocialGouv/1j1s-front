import { PageTags } from '~/client/services/analytics/analytics';

import { AnalyticsService } from './analytics.service';

export function anAnalyticsService(overrides?: Partial<AnalyticsService>): AnalyticsService {
	return {
		envoyerAnalyticsPageVue: jest.fn(),
		isAllowed: jest.fn(() => true),
		...overrides,
	};
}

export function aPageTags(overrides?: Partial<PageTags>): PageTags {
	return {
		page_template: 'accueil',
		pagegroup: 'accueil',
		pagelabel: 'accueil',
		'segment-site': 'accueil',
		...overrides,
	};
}
