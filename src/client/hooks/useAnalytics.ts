import { useCallback, useEffect, useRef } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { PageTags } from '~/client/services/analytics/analytics';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';

function useAnalytics(pageTags: PageTags): AnalyticsService {
	const analyticsService = useDependency<AnalyticsService>('analyticsService');
	const analyticsAlreadySent = useRef(false);

	const sendAnalytics = useCallback(() => {
		if (!analyticsAlreadySent.current) {
			analyticsService.envoyerAnalyticsPageVue(pageTags);
			analyticsAlreadySent.current = true;
		}
	}, [analyticsService, pageTags]);

	useEffect(function addEventListeners() {
		document.addEventListener('eulerian_allowed', sendAnalytics);
		return () => {
			document.removeEventListener('eulerian_allowed', sendAnalytics);
		};
	}, [sendAnalytics]);

	if (analyticsService.isAllowed()) {
		sendAnalytics();
	}

	return analyticsService;
}

export default useAnalytics;
