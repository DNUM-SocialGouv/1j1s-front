/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aFormationInitialeService } from '~/client/services/formationInitiale/formationInitiale.service.fixture';
import FormationsInitialesPage, { getServerSideProps } from '~/pages/formations-initiales/index.page';

describe('quand le feature flip n‘est pas actif', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	it('la page n‘est pas disponbile', async () => {
		process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '0';
		render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
				formationInitialeService={aFormationInitialeService()}>
				<FormationsInitialesPage/>
			</DependenciesProvider>,
		);

		await waitFor(async () => {
			const result = await getServerSideProps();
			expect(result).toMatchObject({ notFound: true });
		});
	});
});

describe('quand le feature flip est actif', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';
		mockUseRouter({});
		mockLargeScreen();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({ query: { page: '1' } });
		const user = userEvent.setup();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
				formationInitialeService={aFormationInitialeService()}>
				<FormationsInitialesPage/>
			</DependenciesProvider>,
		);

		const rechercherButton = screen.getByRole('button', { name: 'Rechercher' });
		await user.click(rechercherButton);

		await screen.findByRole('list', { name: /Formations Initiales/i });

		expect(container).toBeAccessible();
	});

	it('envoie les analytics de la page', async () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService} formationInitialeService={aFormationInitialeService()}>
				<FormationsInitialesPage/>
			</DependenciesProvider>,
		);
		await waitFor(() => {
			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'contenu_liste_niv_1',
				pagegroup: 'formation_initiale_liste',
				pagelabel: 'contenu_liste_niv_1',
				'segment-site': 'contenu_liste',
			});
		});
	});

	it('affiche le titre de la page', async () => {
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}
				formationInitialeService={aFormationInitialeService()}>
				<FormationsInitialesPage/>
			</DependenciesProvider>);

		const heading = screen.getByRole('heading', { level: 1 });

		await waitFor(() => {
			expect(heading).toHaveTextContent('Des milliers de formations pour vous permettre');
		});
		expect(heading).toHaveTextContent('de réaliser votre projet professionnel');
	});
});
