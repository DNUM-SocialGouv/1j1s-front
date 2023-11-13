import { useCallback, useEffect, useRef } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { PageTags } from '~/client/services/analytics/analytics';
import { ManualAnalyticsService } from '~/client/services/analytics/manualAnalyticsService';

function useAnalytics(pageTags: PageTags): ManualAnalyticsService {
	const analyticsService = useDependency<ManualAnalyticsService>('analyticsService');
	const analyticsAlreadySent = useRef(false);

	const sendAnalytics = useCallback(() => {
		if (analyticsService.isAllowed() && !analyticsAlreadySent.current) {
			analyticsService.envoyerAnalyticsPageVue(pageTags);
			analyticsAlreadySent.current = true;
		}
	}, [analyticsService, pageTags]);

	useEffect(function addEventListeners() {
		document.addEventListener('eulerian_allowed', sendAnalytics);
		document.addEventListener('eulerian_loaded', sendAnalytics);
		document.addEventListener('eulerian_added', sendAnalytics);
		return () => {
			document.removeEventListener('eulerian_allowed', sendAnalytics);
			document.removeEventListener('eulerian_loaded', sendAnalytics);
			document.removeEventListener('eulerian_added', sendAnalytics);
		};
	}, [sendAnalytics]);

	sendAnalytics();

	return analyticsService;
}

export default useAnalytics;
