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
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import {
	aStageDeposerOffreEtape1PersistenceService,
} from '~/client/services/stageDeposerOffreEtape1Persistence/stageDeposerOffreEtape1Persistence.service.fixture';
import {
	aStageDeposerOffreEtape2PersistenceService,
} from '~/client/services/stageDeposerOffreEtape2Persistence/stageDeposerOffreEtape2Persistence.service.fixture';
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
		mockUseRouter({});
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider
				analyticsService={aManualAnalyticsService()}
				stageDeposerOffreEtape1PersistenceService={aStageDeposerOffreEtape1PersistenceService()}
				stageDeposerOffreEtape2PersistenceService={aStageDeposerOffreEtape2PersistenceService()}
			>
				<DeposerOffreStageEtape2Page />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
