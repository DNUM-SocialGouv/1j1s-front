/**
 * @jest-environment jsdom
 */


import '~/test-utils';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { ManualAnalyticsService } from '~/client/services/analytics/analytics.service';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Accueil from '~/pages/index.page';

describe('Page d‘accueil', () => {
	let analyticsService: ManualAnalyticsService;

	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({ asPath: '/' });
		analyticsService = aManualAnalyticsService();
	});

	it('doit rendre du HTML respectant la specification', () => {
		const { container } = render(
			<DependenciesProvider analyticsService={analyticsService}>
				<Accueil/>
			</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider analyticsService={analyticsService}>
				<Accueil/>
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});

	describe('la section offres', () => {
		it('contient une carte de redirection vers les stages d’études', () => {
			// WHEN
			render(
				<DependenciesProvider analyticsService={analyticsService}>
					<Accueil/>
				</DependenciesProvider>,
			);

			// THEN
			const redirectionVersStagesDEtudes = screen.getByRole('link', { name: 'Stages d’études Voir les offres Plus de 20 000 offres de stages sélectionnées spécialement pour vous' } );
			expect(redirectionVersStagesDEtudes).toBeVisible();
			expect(redirectionVersStagesDEtudes).toHaveAttribute('href', '/stages');
		});

		describe('quand la feature stages de 3ème est activée', () => {
			it('contient une carte de redirection vers les stages de 3ème', () => {
				// GIVEN
				process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '1';

				// WHEN
				render(
					<DependenciesProvider analyticsService={analyticsService}>
						<Accueil/>
					</DependenciesProvider>,
				);

				// THEN
				const redirectionVersStages3eme = screen.getByRole('link', { name: 'Stages de 3ème Voir les offres Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème' } );
				expect(redirectionVersStages3eme).toBeVisible();
				expect(redirectionVersStages3eme).toHaveAttribute('href', '/stages-3eme');
			});
		});

		describe('quand la feature stages de 3ème est désactivée', () => {
			it('ne contient pas de carte de redirection vers les stages de 3ème', () => {
				// GIVEN
				process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '0';

				// WHEN
				render(
					<DependenciesProvider analyticsService={analyticsService}>
						<Accueil/>
					</DependenciesProvider>,
				);

				// THEN
				const redirectionStage3eme = screen.queryByRole('link', { name: 'Stages de 3ème Voir les offres Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème' });
				expect(redirectionStage3eme).not.toBeInTheDocument();
			});
		});
	});

	describe('jobs d‘été', () => {
		describe('quand le feature flip de jobs d‘été n‘est pas actif', () => {
			it('je ne vois pas la carte de redirection vers les jobs d‘été', () => {
				process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '0';
				render(
					<DependenciesProvider analyticsService={analyticsService}>
						<Accueil/>
					</DependenciesProvider>,
				);
				expect(screen.queryByText('Jobs d‘été')).not.toBeInTheDocument();
			});
		});
		describe('quand le feature flip de jobs d‘été est actif', () => {
			it('je vois la carte de redirection vers les jobs d‘été', async () => {
				process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '1';
				const user = userEvent.setup();

				render(
					<DependenciesProvider analyticsService={analyticsService}>
						<Accueil/>
					</DependenciesProvider>,
				);

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
				render(
					<DependenciesProvider analyticsService={analyticsService}>
						<Accueil/>
					</DependenciesProvider>,
				);
				expect(screen.queryByText('Formations initiales')).not.toBeInTheDocument();
			});
		});
		describe('quand le feature flip des formations initales est actif', () => {
			it('je vois la carte de redirection vers les formations initiales',  () => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';

				render(
					<DependenciesProvider analyticsService={analyticsService}>
						<Accueil/>
					</DependenciesProvider>,
				);

				const link = screen.getByRole('link', { name: /Plus de 6 000 formations accessibles pour réaliser votre projet et trouver un emploi/ });
				expect(link).toBeVisible();
				expect(link).toHaveAttribute('href', '/formations-initiales');
			});
		});
	});
});
