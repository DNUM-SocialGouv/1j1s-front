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
	aFormulaireÉtapeLocalisation,
	aFormulaireÉtapeStage,
} from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffre.fixture';
import Localisation from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireLocalisation';
import {
	ETAPE_LOCALISATION,
	ETAPE_OFFRE_DE_STAGE,
} from '~/pages/stages/deposer-offre/index.page';


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
		// eslint-disable-next-line jest/no-disabled-tests
		it.skip('ne redirige pas l’utilisateur', async () => {
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			expect(routerPush).not.toHaveBeenCalled();
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
		// eslint-disable-next-line jest/no-disabled-tests
		describe.skip('et qu’il soumet le formulaire', () => {
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

			it('sauvegarde les données remplies dans le localStorage', async () => {
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation/>
					</DependenciesProvider>,
				);

				await remplirFormulaireLocalisation();

				const form = screen.getByRole('form', { name: 'dépôt offre de stage' });
				expect(form).toBeValid();
				await BoutonEnvoyer();
				expect(setLocalItem).toHaveBeenCalledWith(ETAPE_LOCALISATION, JSON.stringify(aFormulaireÉtapeLocalisation()));
				expect(stageService.enregistrerOffreDeStage).toHaveBeenCalled();
				expect(removeSessionItem).toHaveBeenCalledWith(ETAPE_OFFRE_DE_STAGE);
			});

			it('appelle le service de stage', async () => {
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation/>
					</DependenciesProvider>,
				);

				await remplirFormulaireLocalisation();

				await BoutonEnvoyer();
				expect(stageService.enregistrerOffreDeStage).toHaveBeenCalled();

			});

			it('vide le session storage', async () => {
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation/>
					</DependenciesProvider>,
				);

				await remplirFormulaireLocalisation();

				await BoutonEnvoyer();
				expect(removeSessionItem).toHaveBeenCalledWith(ETAPE_OFFRE_DE_STAGE);
			});
		});
		// eslint-disable-next-line jest/no-disabled-tests
		describe.skip('et qu’il avait déjà rempli le formulaire', () => {
			it('utilise localStorage pour restaurer les valeurs', async () => {
				const getLocalItem = jest.fn()
					.mockReturnValueOnce(JSON.stringify(aFormulaireÉtapeEntreprise()))
					.mockReturnValueOnce(JSON.stringify(aFormulaireÉtapeLocalisation()));
				getSessionItem = jest.fn().mockReturnValue(JSON.stringify(aFormulaireÉtapeStage()));
				mockLocalStorage({ getItem: getLocalItem });
				mockSessionStorage({ getItem: getSessionItem });
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation/>
					</DependenciesProvider>,
				);

				expect(screen.getByRole('textbox', { name: 'Adresse' })).toHaveValue('34 avenue de l’Opéra');
				expect(screen.getByRole('textbox', { name: 'Pays' })).toHaveValue('France');
				expect(screen.getByRole('textbox', { name: 'Ville' })).toHaveValue('Paris');
				expect(screen.getByRole('textbox', { name: 'Code postal' })).toHaveValue('75000');
				expect(screen.getByRole('textbox', { name: 'Région' })).toHaveValue('Ile-de-France');
				expect(screen.getByRole('textbox', { name: 'Département' })).toHaveValue('Paris');
			});
		});
	});

});

async function BoutonEnvoyer() {
	const button = screen.getByRole('button', { name: 'Envoyer ma demande de dépôt d’offre' });
	expect(button).toBeInTheDocument();
	await userEvent.click(button);
}

async function remplirFormulaireLocalisation() {
	const inputPays = screen.getByRole('textbox', { name: 'Pays' });
	await userEvent.type(inputPays, 'France');
	await userEvent.click(screen.getByText('France'));

	const inputVille = screen.getByRole('textbox', { name: 'Ville' });
	const inputAdresse = screen.getByRole('textbox', { name: 'Adresse' });
	const inputCodePostal = screen.getByRole('textbox', { name: 'Code postal' });
	const inputRégion = screen.getByRole('textbox', { name: 'Région' });
	const inputDépartement = screen.getByRole('textbox', { name: 'Département' });

	await userEvent.type(inputVille, 'Paris');
	await userEvent.type(inputAdresse, '34 avenue de l’Opéra');
	await userEvent.type(inputCodePostal, '75000');
	await userEvent.type(inputRégion, 'Ile-de-France');
	await userEvent.type(inputDépartement, 'Paris');
}

