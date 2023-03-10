/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterFicheMetierPage from '~/pages/decouvrir-les-metiers/[nomMetier].page';
import { aFicheMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';

describe('Page consulter fiche métier', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('affiche les informations disponibles de la fiche métier', async () => {
		const ficheMetier = aFicheMetier();
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<ConsulterFicheMetierPage ficheMetier={ficheMetier}/>
			</DependenciesProvider>,
		);

		const nomMetier = await screen.findByRole('heading', { level: 1 });
		const sections = await screen.findAllByRole('heading', { level: 2 });

		expect(nomMetier).toBeInTheDocument();
		expect(sections.length).toEqual(7);
	});

	it('envoie les analytics de la page à son affichage', () => {
		const ficheMetier = aFicheMetier();
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<ConsulterFicheMetierPage ficheMetier={ficheMetier}/>
			</DependenciesProvider>,
		);

		expect(analyticsService.trackPageView).toHaveBeenCalledWith('decouvrir-les-metiers/[nomMetier]');
	});
});
