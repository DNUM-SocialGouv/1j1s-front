/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import MesAidesPage from '~/pages/mes-aides/index.page';

describe('MesAidesPage', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = anAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<MesAidesPage />
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'mes_aides_financières',
			pagegroup: 'mes_aides_financières',
			pagelabel: 'mes_aides_financières',
			'segment-site': 'contenu_liens',
		});
	});

	it('permet de rediriger l’utilisateur vers le simulateur d’aide', () => {
		const analyticsService = anAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<MesAidesPage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: 'Je commence la simulation' });

		expect(link).toHaveAttribute('href', 'https://mes-aides.1jeune1solution.beta.gouv.fr/simulation/individu/demandeur/date_naissance');
		expect(link).toHaveAttribute('target', '_blank');
	});
});
