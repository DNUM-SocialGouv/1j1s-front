/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import EspaceJeunePage from '~/pages/espace-jeune/index.page';
import { anActualite, anActualiteList } from '~/server/cms/domain/actualite.fixture';
import { aServiceJeuneList } from '~/server/cms/domain/espaceJeune.fixture';

describe('Page Espace Jeune', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('Si des actualités sont récupérées', () => {
		it('n‘affiche pas le bouton voir plus si moins de 7 actualités', () => {
			const carteActualites = [anActualite({ titre: 'Actualité 1' })];
			const serviceJeuneList = aServiceJeuneList();
			const analyticsService = anAnalyticsService();

			render(
				<DependenciesProvider
					analyticsService={analyticsService}
				>
					<EspaceJeunePage cartesActualites={carteActualites} serviceJeuneList={serviceJeuneList}/>
				</DependenciesProvider>,
			);
			const actualitesSection = screen.getByTestId('actualites');

			expect(within(actualitesSection).queryByRole('button', { name: 'Voir plus de résultats sur les actualités' })).not.toBeInTheDocument();
		});

		it('affiche pas le bouton voir plus si plus de 6 actualités', () => {
			const carteActualites = anActualiteList();
			const serviceJeuneList = aServiceJeuneList();
			const analyticsService = anAnalyticsService();

			render(
				<DependenciesProvider
					analyticsService={analyticsService}
				>
					<EspaceJeunePage cartesActualites={carteActualites} serviceJeuneList={serviceJeuneList}/>
				</DependenciesProvider>,
			);
			const actualitesSection = screen.getByTestId('actualites');

			expect(within(actualitesSection).getByRole('button', { name: 'Voir plus de résultats sur les actualités' })).toBeInTheDocument();
		});

		it('envoie les analytics de la page à son affichage', () => {
			const carteActualites = anActualiteList();
			const serviceJeuneList = aServiceJeuneList();
			const analyticsService = anAnalyticsService();

			render(
				<DependenciesProvider
					analyticsService={analyticsService}
				>
					<EspaceJeunePage cartesActualites={carteActualites} serviceJeuneList={serviceJeuneList}/>
				</DependenciesProvider>,
			);

			expect(analyticsService.trackPageView).toHaveBeenCalledWith({
				page_template: 'contenu_liste_niv_1',
				pagegroup: 'service_jeune_liste',
				pagelabel: 'contenu_liste_niv_1',
				'segment-site': 'contenu_liste',
			});
		});
	});
});
