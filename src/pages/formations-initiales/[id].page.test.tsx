/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterFormationInitialePage from '~/pages/formations-initiales/[id].page';
import { getServerSideProps } from '~/pages/formations-initiales/index.page';
import {
	aFormationInitialeDetailComplete,
} from '~/server/formations-initiales-detail/domain/formationInitiale.fixture';

describe('quand le feature flip est actif', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';
		mockUseRouter({});
		mockLargeScreen();
	});

	it('envoie les analytics de la page', () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<ConsulterFormationInitialePage formationInitialeDetail={aFormationInitialeDetailComplete()}/>
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'contenu_detail_niv_2',
			pagegroup: 'formation_initiale_detail',
			pagelabel: 'contenu_liste_niv_1',
			'segment-site': 'contenu_liste',
		});
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<ConsulterFormationInitialePage formationInitialeDetail={aFormationInitialeDetailComplete()}/>
			</DependenciesProvider>,
		);

		expect(container).toBeAccessible();
	});

	describe('affiche des informations sur l‘origine de la donnée', () => {
		it('le partnenaire est ONISEP', () => {
			// GIVEN
			const analyticsService = anAnalyticsService();

			// WHEN
			render(
				<DependenciesProvider analyticsService={analyticsService}>
					<ConsulterFormationInitialePage formationInitialeDetail={aFormationInitialeDetailComplete()}/>
				</DependenciesProvider>,
			);

			// THEN
			const onisepCardTitle = screen.getByRole('heading', { level: 2, name: /Onisep : l’information pour l’orientation/ });
			expect(onisepCardTitle).toBeVisible();
		});

		it('la date de mise à jour de la donnée est celle de la mise à jour des fiches détails quand le détail provient des idéo-fiches formations', () => {
			// GIVEN
			const analyticsService = anAnalyticsService();
			const updateDate = '2023-05-15T09:37:44.283Z';
			const detailsUpdateDate = '15 mai 2023';

			// WHEN
			render(
				<DependenciesProvider analyticsService={analyticsService}>
					<ConsulterFormationInitialePage formationInitialeDetail={aFormationInitialeDetailComplete({ updatedAt: updateDate })}/>
				</DependenciesProvider>,
			);

			// THEN
			const onisepCardTitle = screen.getByText(`Idéo-fiches formations, Onisep, ${detailsUpdateDate}, sous licence ODBL`);
			expect(onisepCardTitle).toBeVisible();
		});

		it('la date de mise à jour de la donnée est la date du jour quand il n‘il y a pas de détail provenant d’idéo-fiches formations', () => {
			// GIVEN
			const analyticsService = anAnalyticsService();
			const todayDate = '26 juillet 2023';
			jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue(todayDate);

			// WHEN
			render(
				<DependenciesProvider analyticsService={analyticsService}>
					<ConsulterFormationInitialePage formationInitialeDetail={aFormationInitialeDetailComplete({ updatedAt: undefined })}/>
				</DependenciesProvider>,
			);

			// THEN
			const onisepCardTitle = screen.getByText(`Idéo-fiches formations, Onisep, ${todayDate}, sous licence ODBL`);
			expect(onisepCardTitle).toBeVisible();
		});
	});
});
describe('quand le feature flip n‘est pas actif', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	it('la page n‘est pas disponbile', async () => {
		process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '0';
		render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<ConsulterFormationInitialePage formationInitialeDetail={aFormationInitialeDetailComplete()}/>
			</DependenciesProvider>,
		);

		const result = await getServerSideProps();
		expect(result).toMatchObject({ notFound: true });
	});
});
