/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Accueil from '~/pages/index.page';

describe('Page d‘accueil', () => {
	let analyticsService: AnalyticsService;
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({ asPath: '/' });
		analyticsService = anAnalyticsService();
	});
	describe('jobs d‘été', () => {
		describe('quand le feature flip de jobs d‘été n‘est pas actif', () => {
			it('je ne vois pas la carte de redirection vers les jobs d‘été', () => {
				process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '0';
				render(<DependenciesProvider analyticsService={analyticsService}>
					<Accueil/></DependenciesProvider>);
				expect(screen.queryByText('Jobs d‘été')).not.toBeInTheDocument();
			});
		});
		describe('quand le feature flip de jobs d‘été est actif', () => {
			it('je vois la carte de redirection vers les jobs d‘été', async () => {
				process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '1';
				const user = userEvent.setup();

				render(<DependenciesProvider analyticsService={analyticsService}>
					<Accueil/>
				</DependenciesProvider>);

				const voirPlusButton = screen.getByRole('button', { name: 'Voir plus de résultats sur les offres d‘emplois' });
				expect(voirPlusButton).toBeVisible();
				await user.click(voirPlusButton);

				expect(screen.queryByText('Des milliers d‘offres de jobs d‘été sélectionnées pour vous (durée maximale de 2 mois)')).toBeVisible();
			});
		});

	});
	describe('formations initiales', () => {
		describe('quand le feature flip des formations initales n‘est pas actif', () => {
			it('je ne vois pas la carte de redirection vers les formations initiales', () => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '0';
				render(<DependenciesProvider analyticsService={analyticsService}>
					<Accueil/></DependenciesProvider>);
				expect(screen.queryByText('Formations initiales')).not.toBeInTheDocument();
			});
		});
		describe('quand le feature flip des formations initales est actif', () => {
			it('je vois la carte de redirection vers les formations initiales',  () => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';

				render(<DependenciesProvider analyticsService={analyticsService}>
					<Accueil/>
				</DependenciesProvider>);

				expect(screen.getByText('Plus de 20 000 formations accessibles pour réaliser votre projet et trouver un emploi')).toBeVisible();
			});
		});
	});
});
