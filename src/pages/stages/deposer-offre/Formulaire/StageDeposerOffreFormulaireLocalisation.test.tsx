/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import Localisation from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireLocalisation';

describe('<Localisation />', () => {
	beforeEach(() => {
		mockUseRouter({});
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: jest.fn(() =>  null),
			},
		});
	});

	describe('quand l’utilisateur arrive sur la page Localisation', () => {
		it('il peut cliquer sur le bouton Retour pour retourner vers l’étape 2' , async () => {
			render(<Localisation />);

			const retourLink = screen.getByRole('link', { name: 'Retour à l’étape précédente' });

			expect(retourLink).toHaveAttribute('href', '/stages/deposer-offre/votre-offre-de-stage');
		});

		it('affiche la troisième étape de formulaire', () => {
			render(<Localisation />);

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
			render(<Localisation />);

			//When
			await userEvent.type(screen.getByLabelText(labelRegion), 's{backspace}');
			await userEvent.type(screen.getByLabelText(labelDepartement), 's{backspace}');

			// Then
			expect(screen.getByLabelText(labelRegion)).toBeValid();
			expect(screen.getByLabelText(labelDepartement)).toBeValid();
		});
		it('utilise localStorage', async () => {
			render(<Localisation/>);

			await remplirFormulaireLocalisation();

			expect(window.localStorage.getItem).toHaveBeenCalled();
		});
	});

	describe('quand l’utilisateur clique sur Envoyer ma demande de dépôt d’offre mais n’a pas rempli l’étape 3', () => {
		it('il voit des messages d’erreur', async () => {
			render(<Localisation />);

			const inputPays = screen.getByRole('textbox', { name: 'Pays' });
			await userEvent.type(inputPays, 'france');
			await userEvent.click(screen.getByRole('option'));

			await BoutonEnvoyer();

			expect(screen.getByRole('textbox', { name: 'Pays' })).toBeValid();
			expect(screen.getByRole('textbox', { name: 'Ville' })).toBeInvalid();
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
