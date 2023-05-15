import { useEffect, useState } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { PageTags } from '~/client/services/analytics/analytics';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';

function useAnalytics(pageTags: PageTags): AnalyticsService {
	const analyticsService = useDependency<AnalyticsService>('analyticsService');

	const [isAnalyticsAutorisé, setIsAnalyticsAllowed] = useState<boolean>(analyticsService.isAnalyticsAutorisé());

	useEffect(function addEventListeners() {
		function RetrySendingAnalytics() {
			setIsAnalyticsAllowed(!isAnalyticsAutorisé);
		}

		document.addEventListener('eulerian_allowed', RetrySendingAnalytics);
		document.addEventListener('eulerian_added', RetrySendingAnalytics);
		document.addEventListener('eulerian_loaded', RetrySendingAnalytics);
		document.addEventListener('eulerian_disallowed', RetrySendingAnalytics);

		return () => {
			document.removeEventListener('eulerian_allowed', RetrySendingAnalytics);
			document.removeEventListener('eulerian_added', RetrySendingAnalytics);
			document.removeEventListener('eulerian_loaded', RetrySendingAnalytics);
			document.removeEventListener('eulerian_disallowed', RetrySendingAnalytics);
		};
	}, [isAnalyticsAutorisé, setIsAnalyticsAllowed]);

	useEffect(function sendAnalytics() {
		analyticsService.envoyerAnalyticsPageVue(pageTags);
	}, [analyticsService, isAnalyticsAutorisé, pageTags]);

	return analyticsService;
}

export default useAnalytics;
