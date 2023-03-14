/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import FaqPage from '~/pages/faq/index.page';

describe('Page FAQ', () => {
	describe('quand le feature flip n‘est pas actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FAQ_FEATURE: '0',
			};
		});

		it('ne retourne rien', async () => {
			render(
				<DependenciesProvider analyticsService={anAnalyticsService()}>
					<FaqPage/>
				</DependenciesProvider>,
			);


			const title = screen.queryByRole('heading', { level: 1 });
			expect(title).not.toBeInTheDocument();
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_FAQ_FEATURE: '1',
			};
		});

		it('affiche le titre de la page', async () => {
			render(
				<DependenciesProvider analyticsService={anAnalyticsService()}>
					<FaqPage/>
				</DependenciesProvider>,
			);

			const title = await screen.findByRole('heading', { level: 1 });
			expect(title).toHaveTextContent('FAQ - Questions fréquemment posées');
		});

		it('envoie les analytics de la page à son affichage', async () => {
			const analyticsService = anAnalyticsService();
			render(
				<DependenciesProvider analyticsService={analyticsService}>
					<FaqPage/>
				</DependenciesProvider>,
			);

			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'contenu_statique',
				pagegroup: 'contenu_statique',
				pagelabel: 'contenu_statique',
				'segment-site': 'page_de_base',
			});
		});
	});
});
