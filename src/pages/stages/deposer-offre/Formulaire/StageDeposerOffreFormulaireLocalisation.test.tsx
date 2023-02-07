/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLocalStorage } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { StageService } from '~/client/services/stage/stage.service';
import { aStageService } from '~/client/services/stage/stageService.fixture';
import Localisation from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireLocalisation';
import {
	aFormulaireDepotDeStageLocalisationLocalStorage,
} from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireLocalisation.fixture';

describe('<Localisation />', () => {
	let stageService: StageService;
	beforeEach(() => {
		stageService = aStageService();
		mockUseRouter({});
	});

	describe('quand l’utilisateur arrive sur la page Localisation', () => {
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
		it('sauvegarde les données rempli dans le localStorage', async () => {
			mockLocalStorage();

			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			await remplirFormulaireLocalisation();

			await BoutonEnvoyer();
			expect(window.localStorage.getItem('formulaireEtape3')).toEqual(JSON.stringify(aFormulaireDepotDeStageLocalisationLocalStorage()));
		});
		describe('et qu’il avait déjà rempli le formulaire', () =>{
			mockLocalStorage();
			setLocalStorage();
			it('utilise localStorage pour restaurer les valeurs', async () => {
				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation/>
					</DependenciesProvider>,
				);

				expect(screen.getByRole('textbox', { name: 'Adresse' })).toHaveValue('France');
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
}

async function remplirFormulaireLocalisation() {
	const inputPays = screen.getByRole('textbox', { name: 'Pays' });
	const inputVille = screen.getByRole('textbox', { name: 'Ville' });
	const inputAdresse = screen.getByRole('textbox', { name: 'Adresse' });
	const inputCodePostal = screen.getByRole('textbox', { name: 'Code postal' });
	const inputRégion = screen.getByRole('textbox', { name: 'Région' });
	const inputDépartement = screen.getByRole('textbox', { name: 'Département' });
	await userEvent.type(inputPays, 'France');
	await userEvent.type(inputVille, 'Paris');
	await userEvent.type(inputAdresse, '34 avenue de l’Opéra');
	await userEvent.type(inputCodePostal, '75000');
	await userEvent.type(inputRégion, 'Ile-de-France');
	await userEvent.type(inputDépartement, 'Paris');
}

function setLocalStorage() {
	window.localStorage.setItem('formulaireEtape3', JSON.stringify(aFormulaireDepotDeStageLocalisationLocalStorage()));
	window.localStorage.setItem('formulaireEtape1', 'not-null');
	window.localStorage.setItem('formulaireEtape2', 'not-null');
}
