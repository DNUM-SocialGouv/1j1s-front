/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMetierService } from '~/client/services/metiers/metier.fixture';
import { aStage3eEt2deService } from '~/client/services/stage3eEt2de/stage3eEt2de.service.fixture';

import Stages3eEt2dePage, { getServerSideProps } from './index.page';

describe('Page stages de 3e et 2de', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	describe('lorsque la feature n‘est pas activée', () => {
		it('retourne une page 404', async () => {
			process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '0';

			const result = await getServerSideProps();
			expect(result).toMatchObject({ notFound: true });
		});
	});

	describe('lorsque la feature est activée', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '1';
			mockUseRouter({});
			mockSmallScreen();
		});
		it('doit rendre du HTML respectant la specification', async () => {
			const { container } = render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					stage3eEt2deService={aStage3eEt2deService()}
					metierStage3eEt2deService={aMetierService()}
					localisationService={aLocalisationService()}
				>
					<Stages3eEt2dePage/>
				</DependenciesProvider>);

			await screen.findByRole('heading', { name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3e et 2de' });
			expect(container.outerHTML).toHTMLValidate();
		});
		it('n‘a pas de défaut d‘accessibilité', async () => {
			const { container } = render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					stage3eEt2deService={aStage3eEt2deService()}
					metierStage3eEt2deService={aMetierService()}
					localisationService={aLocalisationService()}
				>
					<Stages3eEt2dePage/>
				</DependenciesProvider>);
			await screen.findByRole('heading', { name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3e et 2de' });
			await expect(container).toBeAccessible();
		});

		it('je vois le titre', async () => {
			render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					stage3eEt2deService={aStage3eEt2deService()}
					metierStage3eEt2deService={aMetierService()}
					localisationService={aLocalisationService()}
				>
					<Stages3eEt2dePage/>
				</DependenciesProvider>);

			await screen.findByRole('heading', { name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3e et 2de' });

			const pageHeading = screen.getByRole('heading', {
				level: 1,
				name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3e et 2de',
			});
			expect(pageHeading).toBeVisible();
		});

		it('envoie les analytics', async () => {
			const analyticsService = aManualAnalyticsService();
			render(
				<DependenciesProvider
					analyticsService={analyticsService}
					stage3eEt2deService={aStage3eEt2deService()}
					metierStage3eEt2deService={aMetierService()}
					localisationService={aLocalisationService()}
				>
					<Stages3eEt2dePage/>
				</DependenciesProvider>,
			);

			await screen.findByRole('heading', { name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3e et 2de' });

			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'contenu_liste_niv_1',
				pagegroup: 'stages_3e_liste',
				pagelabel: 'contenu_liste_niv_1',
				'segment-site': 'contenu_liste',
			});
		});
	});
});
