/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterFormationInitialePage from '~/pages/formations-initiales/[id].page';
import { getServerSideProps } from '~/pages/formations-initiales/index.page';
import {
	aFormationInitialeDetailComplete,
} from '~/server/formations-initiales-detail/domain/formationInitiale.fixture';
import { checkA11y } from '~/test-utils';

describe('quand le feature flip est actif', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';
		mockUseRouter({});
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

		await checkA11y(container);
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
