/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';

import StageDeposerOffreFormulaireEnvoye
	from '~/client/components/features/OffreDeStage/Déposer/Confirmation/StageDeposerOffreFormulaireEnvoye';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { checkA11y } from '~/test-utils';

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

		await waitFor(async () => {
			await checkA11y(container);
		});
	});
});
