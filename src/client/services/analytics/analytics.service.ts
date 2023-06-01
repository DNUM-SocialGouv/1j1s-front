import { PageTags } from './analytics';

export interface AnalyticsService {
	envoyerAnalyticsPageVue(tags: PageTags): void;
	isAllowed(): boolean;
}

