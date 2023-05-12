import { useEffect, useState } from 'react';

import { useDependency } from '~/client/context/dependenciesContainer.context';
import { PageTags } from '~/client/services/analytics/analytics';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';

function useAnalytics(pageTags: PageTags): AnalyticsService {
	const analyticsService = useDependency<AnalyticsService>('analyticsService');

	const [isAnalyticsAutorisé, setIsAnalyticsAllowed] = useState<boolean>(analyticsService.isAnalyticsAutorisé());

	const onAnalyticsAutorisé = () => {
		console.log('onAnalyticsAutorisé');
		setIsAnalyticsAllowed(true);
	};
	const onAnalyticsInterdit = () => setIsAnalyticsAllowed(false);

	useEffect(() => {
		console.log('addEventListener allowed');
		document.addEventListener('eulerian_allowed', onAnalyticsAutorisé);
		return () => {
			console.log('remove addEventListener allowed');
			document.removeEventListener('eulerian_allowed', onAnalyticsAutorisé);
		};
	}, []);

	useEffect(() => {
		console.log('addEventListener added');
		document.addEventListener('eulerian_added', onAnalyticsAutorisé);
		return () => {
			console.log('remove addEventListener added');
			document.removeEventListener('eulerian_added', onAnalyticsAutorisé);
		};
	}, []);


	useEffect(() => {
		console.log('addEventListener loaded');
		document.addEventListener('eulerian_loaded', onAnalyticsAutorisé);
		return () => document.removeEventListener('eulerian_loaded', onAnalyticsAutorisé);
	}, []);


	useEffect(() => {
		console.log('addEventListener disallowed');
		document.addEventListener('eulerian_disallowed', onAnalyticsInterdit);
		return () => document.removeEventListener('eulerian_disallowed', onAnalyticsInterdit);
	}, []);

	useEffect(() => {
		console.log('envoyerAnalyticsPageVue');
		analyticsService.envoyerAnalyticsPageVue(pageTags);
	}, [isAnalyticsAutorisé]);

	return analyticsService;
}

export default useAnalytics;
