/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import { PageTags } from '~/client/services/analytics/analytics';
import { anAnalyticsService, aPageTags } from '~/client/services/analytics/analytics.service.fixture';

function TestComponent({ pageTags }: { pageTags: PageTags }) {
	useAnalytics(pageTags);

	return <></>;
}

describe('useAnalytics()', () => {
	it("envoie les analytics de la page quand l'utilisateur accepte les cookies", () => {
		const analyticsService = anAnalyticsService();
		const pageTags = aPageTags();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={pageTags}/>
			</DependenciesProvider>,
		);

		document.dispatchEvent(new Event('eulerian_allowed'));

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith(pageTags);
	});
	it('envoie les analytics au chargement de la page quand les cookies sont déjà acceptés', () => {
		const analyticsService = anAnalyticsService();
		const pageTags = aPageTags();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={pageTags}/>
			</DependenciesProvider>,
		);

		document.dispatchEvent(new Event('eulerian_loaded'));

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith(pageTags);
	});
});
