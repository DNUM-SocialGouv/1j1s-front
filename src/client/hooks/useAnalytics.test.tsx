/**
 * @jest-environment jsdom
 */
import { act, render } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import { PageTags } from '~/client/services/analytics/analytics';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { anAnalyticsService, aPageTags } from '~/client/services/analytics/analytics.service.fixture';

function TestComponent({ pageTags }: { pageTags: PageTags }) {
	useAnalytics(pageTags);

	return <></>;
}
async function allowAnalytics(service: AnalyticsService) {
	return act(() => {
		service.isAllowed = () => true;
		document.dispatchEvent(new Event('eulerian_allowed'));
	});
}
async function disallowAnalytics(service: AnalyticsService) {
	return act(() => {
		service.isAllowed = () => false;
		document.dispatchEvent(new Event('eulerian_disallowed'));
	});
}

describe('useAnalytics()', () => {
	it("envoie les analytics de la page quand l'utilisateur accepte les cookies", async () => {
		const analyticsService = anAnalyticsService({ isAllowed: () => false });
		const pageTags = aPageTags();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={pageTags}/>
			</DependenciesProvider>,
		);

		await allowAnalytics(analyticsService);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith(pageTags);
	});
	it('envoie les analytics au chargement de la page quand les cookies sont déjà acceptés', async () => {
		const analyticsService = anAnalyticsService({ isAllowed: () => true });
		const pageTags = aPageTags();

		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={pageTags}/>
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith(pageTags);
	});
	it('n’envoie pas les analytics passé la première fois que les cookies sont acceptés', async () => {
		const analyticsService = anAnalyticsService({ isAllowed: () => false });
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={aPageTags()}/>
			</DependenciesProvider>,
		);

		await allowAnalytics(analyticsService);
		await disallowAnalytics(analyticsService);
		await allowAnalytics(analyticsService);
		await disallowAnalytics(analyticsService);
		await allowAnalytics(analyticsService);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
	});
	it('n’envoie pas les analytics passé la première fois que les cookies sont acceptés quand la page charge avec les cookies acceptés', async () => {
		const analyticsService = anAnalyticsService({ isAllowed: () => true });
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={aPageTags()}/>
			</DependenciesProvider>,
		);

		await disallowAnalytics(analyticsService);
		await allowAnalytics(analyticsService);
		await disallowAnalytics(analyticsService);
		await allowAnalytics(analyticsService);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
	});
});
