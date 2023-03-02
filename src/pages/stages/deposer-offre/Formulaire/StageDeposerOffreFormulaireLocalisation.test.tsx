/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import {
	render,
	screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import {
	mockLocalStorage,
	mockSessionStorage,
} from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { StageService } from '~/client/services/stage/stage.service';
import { aStageService } from '~/client/services/stage/stageService.fixture';
import {
	aFormulaireÉtapeEntreprise,
	aFormulaireÉtapeStage,
} from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffre.fixture';
import Localisation from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireLocalisation';

describe('<Localisation />', () => {
	let stageService: StageService;

	beforeEach(() => {
		stageService = aStageService();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand l’étape 1 n’est pas remplie', () => {
		beforeEach(() => {
			mockLocalStorage({ getItem: jest.fn().mockReturnValue(null) });
			mockSessionStorage({ getItem: jest.fn().mockReturnValue(JSON.stringify(aFormulaireÉtapeStage())) });
		});

		it('redirige vers l’étape 1 du formulaire', async () => {
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			expect(routerPush).toHaveBeenCalledWith('/stages/deposer-offre');
		});
	});

	describe('quand l’étape 2 n’est pas remplie', () => {
		beforeEach(function () {
			mockLocalStorage({ getItem: jest.fn().mockReturnValue(JSON.stringify(aFormulaireÉtapeEntreprise())) });
			mockSessionStorage({ getItem: jest.fn().mockReturnValue(null) });
		});
		it('redirige vers l’étape 1 du formulaire', async () => {
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			expect(routerPush).toHaveBeenCalledWith('/stages/deposer-offre');
		});
	});

	describe('quand l’étape 1 et 2 sont remplies', () => {
		let getSessionItem: jest.Mock;
		let setLocalItem: jest.Mock;
		let removeSessionItem: jest.Mock;

		beforeEach(() => {
			setLocalItem = jest.fn();
			removeSessionItem = jest.fn();
			getSessionItem = jest.fn().mockReturnValue(JSON.stringify(aFormulaireÉtapeStage()));
			mockLocalStorage({
				getItem: jest.fn().mockReturnValue(JSON.stringify(aFormulaireÉtapeEntreprise())),
				setItem: setLocalItem,
			});
			mockSessionStorage({ getItem: getSessionItem, removeItem: removeSessionItem });
		});

		it('il peut cliquer sur le bouton Retour pour retourner vers l’étape 2', async () => {
			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			const retourLink = screen.getByRole('link', { name: 'Retour à l’étape précédente' });

			expect(retourLink).toHaveAttribute('href', '/stages/deposer-offre/votre-offre-de-stage');
		});

		it('affiche la troisième étape de formulaire', () => {
			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			expect(screen.getByText('Etape 3 sur 3 : Localisation du stage')).toBeInTheDocument();
			expect(screen.getByLabelText('Pays')).toBeInTheDocument();
			expect(screen.getByLabelText('Ville')).toBeInTheDocument();
			expect(screen.getByLabelText('Adresse')).toBeInTheDocument();
			expect(screen.getByLabelText('Code postal')).toBeInTheDocument();
			expect(screen.getByLabelText('Région')).toBeInTheDocument();
			expect(screen.getByLabelText('Département')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Envoyer ma demande de dépôt d’offre' })).toBeInTheDocument();
		});

		it('il voit affiché des champs facultatifs', async () => {
			const labelRegion = 'Région';
			const labelDepartement = 'Département';
			// Given
			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			//When
			await userEvent.type(screen.getByLabelText(labelRegion), 's{backspace}');
			await userEvent.type(screen.getByLabelText(labelDepartement), 's{backspace}');

			// Then
			expect(screen.getByLabelText(labelRegion)).toBeValid();
			expect(screen.getByLabelText(labelDepartement)).toBeValid();
		});

	});

});


