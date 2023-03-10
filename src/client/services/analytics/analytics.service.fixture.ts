import { AnalyticsService } from './analytics.service';

export function anAnalyticsService(): AnalyticsService {
	return {
		trackPageView: jest.fn(),
	} as unknown as AnalyticsService;
}
