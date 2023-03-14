import { AnalyticsService } from './analytics.service';

export function anAnalyticsService(): AnalyticsService {
	return {
		envoyerAnalyticsPageVue: jest.fn(),
	} as unknown as AnalyticsService;
}
