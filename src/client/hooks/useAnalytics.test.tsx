/**
 * @jest-environment jsdom
 */
import { act, render } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import { PageTags } from '~/client/services/analytics/analytics';
import { ManualAnalyticsService } from '~/client/services/analytics/analytics.service';
import { aManualAnalyticsService, aPageTags } from '~/client/services/analytics/analytics.service.fixture';

function TestComponent({ pageTags }: { pageTags: PageTags }) {
	useAnalytics(pageTags);

	return <></>;
}
async function allowAnalytics(service: ManualAnalyticsService) {
	return act(() => {
		service.isAllowed = () => true;
		document.dispatchEvent(new Event('eulerian_allowed'));
	});
}

async function loadPreviouslyAcceptedAnalytics(service: ManualAnalyticsService) {
	return act(() => {
		service.isAllowed = () => true;
		document.dispatchEvent(new Event('eulerian_loaded'));
	});
}

async function addPreviouslyAcceptedAnalytics(service: ManualAnalyticsService) {
	return act(() => {
		service.isAllowed = () => true;
		document.dispatchEvent(new Event('eulerian_added'));
	});
}



async function disallowAnalytics(service: ManualAnalyticsService) {
	return act(() => {
		service.isAllowed = () => false;
		document.dispatchEvent(new Event('eulerian_disallowed'));
	});
}

describe('useAnalytics()', () => {
	it("envoie les analytics de la page quand l'utilisateur accepte les cookies", async () => {
		const analyticsService = aManualAnalyticsService({ isAllowed: () => false });
		const pageTags = aPageTags();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={pageTags} />
			</DependenciesProvider>,
		);

		await allowAnalytics(analyticsService);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith(pageTags);
	});
	it('envoie les analytics au chargement de la page quand les cookies sont déjà acceptés', async () => {
		const analyticsService = aManualAnalyticsService({ isAllowed: () => true });
		const pageTags = aPageTags();

		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={pageTags} />
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith(pageTags);
	});
	it('envoie les analytics une fois le script chargé quand les cookies sont déjà acceptés (mais que le script nétait pas chargé au premier rendu', async () => {
		const analyticsService = aManualAnalyticsService({ isAllowed: () => false });
		const pageTags = aPageTags();

		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={pageTags} />
			</DependenciesProvider>,
		);

		await loadPreviouslyAcceptedAnalytics(analyticsService);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith(pageTags);
	});
	it('envoie les analytics une fois le script ajouté quand les cookies sont déjà acceptés (mais que le script nétait pas chargé au premier rendu', async () => {
		const analyticsService = aManualAnalyticsService({ isAllowed: () => false });
		const pageTags = aPageTags();

		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={pageTags} />
			</DependenciesProvider>,
		);

		await addPreviouslyAcceptedAnalytics(analyticsService);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith(pageTags);
	});

	it('envoie quand même les analytics exemptés quand les cookies sont refusés', async () => {
		const analyticsService = aManualAnalyticsService({ isAllowed: () => false });

		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={aPageTags()} />
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
	});
	it('n’envoie qu’une fois les analytics quand l’utilisateur accepte plusieurs fois les cookies', async () => {
		const analyticsService = aManualAnalyticsService({ isAllowed: () => false });
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<TestComponent pageTags={aPageTags()} />
			</DependenciesProvider>,
		);

		await allowAnalytics(analyticsService);
		await disallowAnalytics(analyticsService);
		await allowAnalytics(analyticsService);
		await disallowAnalytics(analyticsService);
		await allowAnalytics(analyticsService);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledTimes(1);
	});
});
