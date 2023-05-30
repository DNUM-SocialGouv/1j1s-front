/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import DeposerOffrePage from '~/pages/apprentissage/deposer-offre/index.page';


describe('deposer-offre', () => {
	it('contient un titre', () => {
		const analyticsService = anAnalyticsService();
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<DeposerOffrePage/>
			</DependenciesProvider>,
		);
		const titre = screen.getByRole('heading', { level: 1 });
		expect(titre).toHaveTextContent('Je dépose une offre d’alternance sur 1jeune1solution');

		const iframe = screen.getByTitle('Formulaire de dépôt d’offre d’alternance en partenariat avec La bonne alternance');
		expect(iframe).toBeInTheDocument();
	});
	it('contient un lien vers le formulaire LBA en cas de problème', () => {
		const analyticsService = anAnalyticsService();
		process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL = 'https://labonnealternance-recette.apprentissage.beta.gouv.fr/';
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<DeposerOffrePage/>
			</DependenciesProvider>,
		);

		const linkFomulaireLBA = screen.getByRole('link', { name: /Formulaire de dépôt d'offre sur La Bonne Alternance/i });
		expect(linkFomulaireLBA).toBeVisible();
		expect(linkFomulaireLBA).toHaveAttribute('href', 'https://labonnealternance-recette.apprentissage.beta.gouv.fr/espace-pro/creation/entreprise/redirec_from_widget_1j1s');
	});
	it('contient un lien vers la page d’authentification de LBA', () => {
		const analyticsService = anAnalyticsService();
		process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL = 'https://labonnealternance-recette.apprentissage.beta.gouv.fr/';
		render(
			<DependenciesProvider analyticsService={analyticsService}>
				<DeposerOffrePage/>
			</DependenciesProvider>,
		);

		const linkAuthentification = screen.getByRole('link', { name: /page d’authentification/i });
		expect(linkAuthentification).toBeVisible();
		expect(linkAuthentification).toHaveAttribute('href', 'https://labonnealternance-recette.apprentissage.beta.gouv.fr/espace-pro/authentification');
	});
});
