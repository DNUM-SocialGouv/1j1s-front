import { PageTags } from '../analytics';
import { AnalyticsService } from '../analytics.service';

export class MultipleAnalyticsServiceWrapper implements AnalyticsService {
	private readonly analyticsServices: AnalyticsService[];

	constructor(analyticsServices: AnalyticsService[]) {
		this.analyticsServices = analyticsServices;
	}

	envoyerAnalyticsPageVue(_tags: PageTags): void {
		this.analyticsServices.forEach((analyticService) => {
			if (analyticService.isAllowed()) {
				analyticService.envoyerAnalyticsPageVue(_tags);
			}
		});
	}

	isAllowed(): boolean {
		return this.analyticsServices.some((analyticService) => analyticService.isAllowed());
	}
}
