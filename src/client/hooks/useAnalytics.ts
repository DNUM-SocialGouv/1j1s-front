import { useEffect } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { PageTags } from '~/client/services/analytics/analytics';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';

function useAnalytics(pageTags: PageTags): AnalyticsService {
	const analyticsService = useDependency<AnalyticsService>('analyticsService');
	
	useEffect(() => {
		analyticsService.trackPageView(pageTags);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return analyticsService;
}

export default useAnalytics;
