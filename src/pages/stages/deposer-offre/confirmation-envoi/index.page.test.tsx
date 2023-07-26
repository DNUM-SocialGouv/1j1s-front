/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import StageDeposerOffreFormulaireEnvoye
	from '~/client/components/features/OffreDeStage/Déposer/Confirmation/StageDeposerOffreFormulaireEnvoye';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';

describe('<DeposerOffreStageEnvoyePage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<StageDeposerOffreFormulaireEnvoye />
			</DependenciesProvider>,
		);

		await screen.findByText('Cette offre est soumise à une validation avant sa mise en ligne.');

		expect(container).toBeAccessible();
	});
});
