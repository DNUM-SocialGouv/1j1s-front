/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import {
	aFormulaireEtapeEntreprise,
} from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLocalStorage, mockSessionStorage } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import DeposerOffreStageEtape2Page from '~/pages/stages/deposer-offre/votre-offre-de-stage/index.page';

describe('<DeposerOffreStageEtape2Page />', () => {
	let setLocalItem: jest.Mock;
	let removeSessionItem: jest.Mock;

	beforeEach(() => {
		setLocalItem = jest.fn();
		removeSessionItem = jest.fn();
		mockLocalStorage({
			getItem: jest.fn().mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise())),
			setItem: setLocalItem,
		});
		mockSessionStorage({ removeItem: removeSessionItem });
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<DeposerOffreStageEtape2Page />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
