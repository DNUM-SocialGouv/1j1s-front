/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import MentoratPage from '~/pages/mentorat/index.page';

describe('MentoratPage', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = anAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<MentoratPage />
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'mentorat',
			pagegroup: 'mentorat',
			pagelabel: 'mentorat',
			'segment-site': 'contenu_liens',
		});
	});

	it('possède un bouton -Je trouve mon mentor- qui redirige l’utilisateur', () => {
		const analyticsService = anAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<MentoratPage />
			</DependenciesProvider>,
		);
		const linkAsButton = screen.getByRole('link', { name: 'Je trouve mon mentor' });

		expect(linkAsButton).toBeInTheDocument();
		expect(linkAsButton).toHaveAttribute('href', 'https://www.1jeune1mentor.fr/formulaire?1jeune1solution');
	});
});
