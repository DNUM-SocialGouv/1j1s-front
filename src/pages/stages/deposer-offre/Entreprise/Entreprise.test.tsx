/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Entreprise from '~/pages/stages/deposer-offre/Entreprise/Entreprise';

describe('<Entreprise />', () => {

	describe('quand l’utilisateur arrive sur la page Entreprise', () => {
		it('il voit afficher la première étape de formulaire', () => {
			render(<Entreprise />);

			expect(screen.getByText('Etape 1 sur 3 : Votre entreprise')).toBeInTheDocument();
			expect(screen.getByLabelText('Indiquez le nom de l’entreprise ou de l’employeur')).toBeInTheDocument();
			expect(screen.getByLabelText('Indiquez une adresse mail de contact')).toBeInTheDocument();
			expect(screen.getByLabelText('Rédigez une courte description de l’entreprise (200 caractères maximum)')).toBeInTheDocument();
			expect(screen.getByLabelText('Partagez le logo de l’entreprise - lien/URL')).toBeInTheDocument();
			expect(screen.getByLabelText('Indiquez le lien du site de l’entreprise - lien/URL')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Suivant' })).toBeInTheDocument();
		});

		it('il voit afficher des champs facultatifs', async () => {
			const labelLogo = 'Partagez le logo de l’entreprise - lien/URL';
			const labelSite = 'Indiquez le lien du site de l’entreprise - lien/URL';
			// Given
			render(<Entreprise />);

			//When
			await userEvent.type(screen.getByLabelText(labelLogo), 's{backspace}');
			await userEvent.type(screen.getByLabelText(labelSite), 's{backspace}');

			// Then
			expect(screen.getByLabelText(labelLogo)).toBeValid();
			expect(screen.getByLabelText(labelSite)).toBeValid();
		});
	});

	describe('quand l’utilisateur clique sur Suivant mais n’a pas rempli l’étape 1', () => {
		it('il voit des messages d’erreur', async () => {
			render(<Entreprise />);

			const inputNomSociété = screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise ou de l’employeur' });
			await userEvent.type(inputNomSociété, 'Crédit Agricole');

			await BoutonSuivant();

			expect(screen.getByRole('textbox', { name: 'Indiquez le nom de l’entreprise ou de l’employeur' })).toBeValid();
			expect(screen.getByRole('textbox', { name: 'Indiquez une adresse mail de contact' })).toBeInvalid();
		});
	});
});

async function BoutonSuivant() {
	const button = screen.getByRole('button', { name: 'Suivant' });
	await userEvent.click(button);
}
