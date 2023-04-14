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
});
