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
import { aStage3emeEt2ndService } from '~/client/services/stage3emeEt2nd/stage3emeEt2nd.service.fixture';

import Stages3emePage, { getServerSideProps } from './index.page';

describe('Page stages de 3ème et 2nd', () => {
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
					stage3emeEt2ndService={aStage3emeEt2ndService()}
					metierStage3emeEt2ndService={aMetierService()}
					localisationService={aLocalisationService()}
				>
					<Stages3emePage/>
				</DependenciesProvider>);

			await screen.findByRole('heading', { name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème et 2nd' });
			expect(container.outerHTML).toHTMLValidate();
		});
		it('n‘a pas de défaut d‘accessibilité', async () => {
			const { container } = render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					stage3emeEt2ndService={aStage3emeEt2ndService()}
					metierStage3emeEt2ndService={aMetierService()}
					localisationService={aLocalisationService()}
				>
					<Stages3emePage/>
				</DependenciesProvider>);
			await screen.findByRole('heading', { name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème et 2nd' });
			await expect(container).toBeAccessible();
		});

		it('je vois le titre', async () => {
			render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}
					stage3emeEt2ndService={aStage3emeEt2ndService()}
					metierStage3emeEt2ndService={aMetierService()}
					localisationService={aLocalisationService()}
				>
					<Stages3emePage/>
				</DependenciesProvider>);

			await screen.findByRole('heading', { name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème et 2nd' });

			const pageHeading = screen.getByRole('heading', {
				level: 1,
				name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème et 2nd',
			});
			expect(pageHeading).toBeVisible();
		});

		it('envoie les analytics', async () => {
			const analyticsService = aManualAnalyticsService();
			render(
				<DependenciesProvider
					analyticsService={analyticsService}
					stage3emeEt2ndService={aStage3emeEt2ndService()}
					metierStage3emeEt2ndService={aMetierService()}
					localisationService={aLocalisationService()}
				>
					<Stages3emePage/>
				</DependenciesProvider>,
			);

			await screen.findByRole('heading', { name: 'Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème et 2nd' });

			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'contenu_liste_niv_1',
				pagegroup: 'stages_3e_liste',
				pagelabel: 'contenu_liste_niv_1',
				'segment-site': 'contenu_liste',
			});
		});
	});
});
