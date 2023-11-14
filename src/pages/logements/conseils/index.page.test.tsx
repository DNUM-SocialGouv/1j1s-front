/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConseilsLogement from '~/pages/logements/conseils/index.page';

describe('ConseilsLogement', () => {
	beforeEach(() => {
		mockUseRouter({ pathname: 'logements/conseils' });
		mockSmallScreen();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<ConseilsLogement/>
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});

	it('envoie les analytics de la page à son affichage', () => {
		const analyticsService = aManualAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<ConseilsLogement/>
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'logement_conseils',
			pagegroup: 'logement_conseils',
			pagelabel: 'logement_conseils',
			'segment-site': 'contenu_liste',
		});
	});

	it('affiche le titre de la page', () => {
		const analyticsService = aManualAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<ConseilsLogement/>
			</DependenciesProvider>,
		);

		const titre = screen.getByRole('heading', { level: 1, name: 'Tout ce qu’il faut savoir et tous nos conseils concernant votre logement' });
		expect(titre).toBeVisible();
	});

	it('affiche les titres des articles en tant que headings de niveau 2', () => {
		const analyticsService = aManualAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<ConseilsLogement/>
			</DependenciesProvider>,
		);

		const titreArticle1 = screen.getByRole('heading', { level: 2, name: 'Comment constituer un dossier locatif ?' });
		const titreArticle2 = screen.getByRole('heading', { level: 2, name: 'Les garants : à quoi ça sert et vers qui me tourner ?' });
		const titreArticle3 = screen.getByRole('heading', { level: 2, name: 'Quelles sont les aides pour payer un logement ?' });
		expect(titreArticle1).toBeVisible();
		expect(titreArticle2).toBeVisible();
		expect(titreArticle3).toBeVisible();
	});
});
