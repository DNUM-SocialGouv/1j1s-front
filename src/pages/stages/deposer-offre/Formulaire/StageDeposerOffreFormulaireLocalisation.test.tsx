/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import {
	mockLocalStorage,
	mockSessionStorage,
} from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { StageService } from '~/client/services/stage/stage.service';
import { aStageService } from '~/client/services/stage/stageService.fixture';
import Localisation from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireLocalisation';
import {
	aFormulaireDepotDeStageEntrepriseLocalStorage,
	aFormulaireDepotDeStageLocalisationLocalStorage,
	aFormulaireDepotDeStageOffreSessionStorage,
} from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireLocalisation.fixture';

describe('<Localisation />', () => {
	let stageService: StageService;
	beforeEach(() => {
		stageService = aStageService();
		mockSessionStorage();
		mockLocalStorage();
		mockUseRouter({});
	});

	afterEach(() => {
		jest.clearAllMocks();
		window.localStorage.clear();
	});
	describe('quand l’utilisateur arrive sur la page Localisation', () => {


		describe('et que l’étape 1 n’est pas rempli', () => {
			it('redirige vers l’étape 1 du formulaire', async () => {
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation />
					</DependenciesProvider>,
				);

				expect(routerPush).toHaveBeenCalledWith('/stages/deposer-offre');
			});
		});
		describe('et que l’étape 2 n’est pas rempli', () => {
			it('redirige vers l’étape 1 du formulaire', async () => {
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });
				window.localStorage.setItem('formulaireEtape1', 'not-null');
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation />
					</DependenciesProvider>,
				);

				expect(routerPush).toHaveBeenCalledWith('/stages/deposer-offre');
			});
		});
		describe('et que l’étape 1 et 2 sont rempli', () => {
			it('ne redirige pas l’utilisateur', async () => {
				const routerPush = jest.fn();
				mockUseRouter({ push: routerPush });
				window.localStorage.setItem('formulaireEtape1', 'not-null');
				window.sessionStorage.setItem('formulaireEtape2', 'not-null');
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation />
					</DependenciesProvider>,
				);

				expect(routerPush).not.toHaveBeenCalled();
			});

			it('il peut cliquer sur le bouton Retour pour retourner vers l’étape 2' , async () => {
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation />
					</DependenciesProvider>,
				);

				const retourLink = screen.getByRole('link', { name: 'Retour à l’étape précédente' });

				expect(retourLink).toHaveAttribute('href', '/stages/deposer-offre/votre-offre-de-stage');
			});

			it('affiche la troisième étape de formulaire', () => {
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation />
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
						<Localisation />
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

		describe('et qu’il soumet le formulaire', () => {
			beforeEach(()=> {
				window.localStorage.setItem('formulaireEtape1', JSON.stringify(aFormulaireDepotDeStageEntrepriseLocalStorage()));
				window.sessionStorage.setItem('formulaireEtape2', JSON.stringify(aFormulaireDepotDeStageOffreSessionStorage()));
			});

			it('sauvegarde les données rempli dans le localStorage', async () => {
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation/>
					</DependenciesProvider>,
				);

				await remplirFormulaireLocalisation();

				const form = screen.getByRole('form', { name: 'dépôt offre de stage' });
				expect(form).toBeValid();
				await BoutonEnvoyer();
				expect(window.localStorage.getItem('formulaireEtape3')).toEqual(JSON.stringify(aFormulaireDepotDeStageLocalisationLocalStorage()));
			});

			it('appel le service de stage', async () => {
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
				expect(window.sessionStorage.getItem('formulaireEtape2')).toEqual(null);
			});
		});


		describe('et qu’il avait déjà rempli le formulaire', () =>{
			it('utilise localStorage pour restaurer les valeurs', async () => {
				setStorage();
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
	await userEvent.click(button);
	expect(button).toBeInTheDocument();
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

function setStorage() {
	window.localStorage.setItem('formulaireEtape3', JSON.stringify(aFormulaireDepotDeStageLocalisationLocalStorage()));
	window.localStorage.setItem('formulaireEtape1', JSON.stringify(aFormulaireDepotDeStageEntrepriseLocalStorage()));
	window.sessionStorage.setItem('formulaireEtape2', JSON.stringify(aFormulaireDepotDeStageOffreSessionStorage()));
}
