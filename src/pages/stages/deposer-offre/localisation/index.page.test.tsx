/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import {
	aFormulaireEtapeEntreprise,
	aFormulaireEtapeStage,
} from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLocalStorage, mockSessionStorage } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStageService } from '~/client/services/stage/stageService.fixture';
import DeposerOffreStageEtape3Page from '~/pages/stages/deposer-offre/localisation/index.page';

describe('<DeposerOffreStageEtape3Page />', () => {
	let getSessionItem: jest.Mock;
	let setLocalItem: jest.Mock;
	let removeSessionItem: jest.Mock;

	beforeEach(() => {
		setLocalItem = jest.fn();
		removeSessionItem = jest.fn();
		getSessionItem = jest.fn().mockReturnValue(JSON.stringify(aFormulaireEtapeStage()));
		mockLocalStorage({
			getItem: jest.fn().mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise())),
			setItem: setLocalItem,
		});
		mockSessionStorage({ getItem: getSessionItem, removeItem: removeSessionItem });
		mockUseRouter({});
	});

	it('doit rendre du HTML respectant la specification', () => {
		const { container } = render(
			<DependenciesProvider stageService={aStageService()}>
				<DeposerOffreStageEtape3Page/>
			</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider
				stageService={aStageService()}
			>
				<DeposerOffreStageEtape3Page />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
