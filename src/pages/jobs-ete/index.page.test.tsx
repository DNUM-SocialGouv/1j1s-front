/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import JobsEtePage, { getServerSideProps } from '~/pages/jobs-ete/index.page';

describe('Page rechercher un job d‘été', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	describe('quand le feature flip n‘est pas actif', () => {
		it('affiche la page non trouvée', async() => {
			process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '0';

			render(
				<DependenciesProvider analyticsService={anAnalyticsService()}>
					<JobsEtePage/>
				</DependenciesProvider>,
			);


			const result = await getServerSideProps();

			expect(result).toMatchObject({ notFound: true });
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '1';
		});

		it('affiche le titre de la page job d‘été', async () => {
			render(
				<DependenciesProvider
					analyticsService={anAnalyticsService()}
				>
					<JobsEtePage/>
				</DependenciesProvider>,
			);

			const titre = await screen.findByRole('heading', { level: 1 });
			expect(titre).toHaveTextContent(/Des milliers de jobs d‘été/i);
		});

		it('envoie les analytics de la page à son affichage', async () => {
			const analyticsService = anAnalyticsService();
			render(
				<DependenciesProvider
					analyticsService={analyticsService}
				>
					<JobsEtePage/>
				</DependenciesProvider>,
			);

			await screen.findByRole('heading', { level: 1 });
			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'emplois_liste',
				pagegroup: 'job_ete',
				pagelabel: 'emplois_liste',
				'segment-site': 'offres_d_emploi',
			});
		});
	});
});
