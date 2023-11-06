/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import DéposerUneOffreDEmploi from '~/pages/emplois/deposer-offre/index.page';

describe('Je recrute / Déposer une offre d‘emploi', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	it('doit rendre du HTML respectant la specification', () => {
		const { container } = render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
			<DéposerUneOffreDEmploi/>
		</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
			>
				<DéposerUneOffreDEmploi />
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
				<DéposerUneOffreDEmploi />
			</DependenciesProvider>,
		);

		expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
			page_template: 'deposer_offre_emploi_etape_1',
			pagegroup: 'deposer_offre_emploi',
			pagelabel: 'deposer_offre_emploi_etape_1',
			'segment-site': 'funnel_etape_1',
		});
	});

	it('affiche un formulaire de référencement des entreprises dans une iframe', () => {
		const analyticsService = aManualAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<DéposerUneOffreDEmploi />
			</DependenciesProvider>,
		);

		const iframe = screen.getByTitle('Formulaire de dépôt d‘offre d‘emploi ou d‘alternance en partenariat avec Pôle Emploi');

		expect(iframe).toBeInTheDocument();
	});

	it('propose des liens vers les conditions générales d‘utilisation et la politique de confidentialité', () => {
		const analyticsService = aManualAnalyticsService();

		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<DéposerUneOffreDEmploi />
			</DependenciesProvider>,
		);

		const lienConditionsGénéralesUtilisation = screen.getByRole('link', { name: 'Conditions Générales d‘Utilisation' });
		const lienPolitiqueConfidentialité = screen.getByRole('link', { name: 'Politique de Confidentialité' });

		expect(lienConditionsGénéralesUtilisation).toBeInTheDocument();
		expect(lienPolitiqueConfidentialité).toBeInTheDocument();
	});
});
