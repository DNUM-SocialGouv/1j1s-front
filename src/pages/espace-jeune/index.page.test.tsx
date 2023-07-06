/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor, within } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import EspaceJeunePage from '~/pages/espace-jeune/index.page';
import { anActualite, anActualiteList } from '~/server/cms/domain/actualite.fixture';
import { aServiceJeuneList } from '~/server/cms/domain/espaceJeune.fixture';
import { checkA11y } from '~/test-utils';

describe('Page Espace Jeune', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const carteActualites = [anActualite({ titre: 'Actualité 1' }), anActualite({ titre: 'Actualité 2' }), anActualite({ titre: 'Actualité 3' })];
		const serviceJeuneList = aServiceJeuneList();

		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<EspaceJeunePage
					cartesActualites={carteActualites}
					serviceJeuneList={serviceJeuneList}
				/>);
			</DependenciesProvider>);

		await waitFor(async () => {
			await checkA11y(container);
		});
	});

	describe('Si des actualités sont récupérées', () => {
		it('n‘affiche pas le bouton voir plus si moins de 4 actualités', () => {
			const carteActualites = [anActualite({ titre: 'Actualité 1' }), anActualite({ titre: 'Actualité 2' }), anActualite({ titre: 'Actualité 3' })];
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

		it('affiche le bouton voir plus si plus de 3 actualités', () => {
			const carteActualites = [anActualite({ titre: 'Actualité 1' }),
				anActualite({ titre: 'Actualité 2' }),
				anActualite({ titre: 'Actualité 3' }),
				anActualite({ titre: 'Actualité 4' })];
			
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

			expect(within(actualitesSection).getByRole('button', { name: 'Voir plus de résultats sur les actualités' })).toBeVisible();
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

			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'contenu_liste_niv_1',
				pagegroup: 'service_jeune_liste',
				pagelabel: 'contenu_liste_niv_1',
				'segment-site': 'contenu_liste',
			});
		});
	});
});
