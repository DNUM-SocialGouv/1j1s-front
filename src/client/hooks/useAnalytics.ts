import { useEffect } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { PageTagsConfig } from '~/client/services/analytics/analytics';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';

function useAnalytics(pageKey: keyof PageTagsConfig): AnalyticsService {
	const analyticsService = useDependency<AnalyticsService>('analyticsService');
	
	useEffect(() => {
		analyticsService.trackPageView(pageKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return analyticsService;
}

export default useAnalytics;
