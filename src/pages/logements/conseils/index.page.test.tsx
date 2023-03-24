/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConseilsLogement from '~/pages/logements/conseils/index.page';

describe('ConseilsLogement', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = anAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<ConseilsLogement/>
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'logement_conseils',
			pagegroup: 'logement_conseils',
			pagelabel: 'logement_conseils',
			'segment-site': 'contenu_liste',
		});
	});

	it('affiche le titre de la page', () => {
		const analyticsService = anAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<ConseilsLogement/>
			</DependenciesProvider>,
		);

		const titre = screen.getByRole('heading', { level: 1, name: 'Découvrez tout ce qu’il faut savoir et tous nos conseils' });
		expect(titre).toBeVisible();
	});

});
