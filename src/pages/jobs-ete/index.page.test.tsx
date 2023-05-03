/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import JobsEtePage from '~/pages/jobs-ete/index.page';

describe('Page rechercher un job d‘été', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	describe('quand le feature flip n‘est pas actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_JOB_ETE_FEATURE: '0',
			};
		});

		it('ne retourne rien', async () => {
			mockUseRouter({ query: { page: '1' } });

			render(
				<DependenciesProvider
					analyticsService={anAnalyticsService()}
				>
					<JobsEtePage isJobsEteActive={false} />
				</DependenciesProvider>,
			);

			const serviceIndisponible = screen.queryByText('Service Indisponible');
			expect(serviceIndisponible).toBeInTheDocument();
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_JOB_ETE_FEATURE: '1',
			};
		});

		it('affiche le titre de la page job d‘été', async () => {
			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					analyticsService={anAnalyticsService()}
				>
					<JobsEtePage isJobsEteActive={true}/>
				</DependenciesProvider>,
			);

			const titre = await screen.findByRole('heading', { level: 1 });
			expect(titre).toHaveTextContent(/Des milliers de jobs d‘été/i);
		});

		it('envoie les analytics de la page à son affichage', async () => {
			const analyticsService = anAnalyticsService();

			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					analyticsService={analyticsService}
				>
					<JobsEtePage isJobsEteActive={true}/>
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
