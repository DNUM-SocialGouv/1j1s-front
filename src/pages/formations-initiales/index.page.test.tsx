/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import FormationsInitialesPage, { getServerSideProps } from '~/pages/formations-initiales/index.page';

describe('quand le feature flip n‘est pas actif', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	it('ne retourne rien', async () => {
		process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '0';
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<FormationsInitialesPage/>
			</DependenciesProvider>,
		);

		const result = await getServerSideProps();
		expect(result).toMatchObject({ notFound: true });
	});
});

describe('quand le feature flip est actif', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';
		mockUseRouter({});
	});

	it('envoie les analytics de la page', () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<FormationsInitialesPage/>
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'contenu_liste_niv_1',
			pagegroup: 'formation_initiale_liste',
			pagelabel: 'contenu_liste_niv_1',
			'segment-site': 'contenu_liste',
		});
	});

	it('affiche le titre de la page', () => {
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<FormationsInitialesPage/>
			</DependenciesProvider>);

		const heading = screen.getByRole('heading', { level: 1 });

		expect(heading).toHaveTextContent('Des milliers de formations pour vous permettre');
	});
});
