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

			expect(screen.queryByText('Jobs d‘été')).toBeVisible();
		});
	});
})
;
