/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import {
	render,
	screen,
	within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Entreprise from '~/client/components/features/OffreDeStage/Déposer/Étape1Entreprise/StageDeposerOffreFormulaireÉtape1Entreprise';
import { mockUseRouter } from '~/client/components/useRouter.mock';

describe('<Entreprise />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	describe('quand l’utilisateur arrive sur la page Entreprise', () => {
		it('affiche la première étape de formulaire', () => {
			render(<Entreprise />);

			expect(screen.getByText('Etape 1 sur 3 : Votre entreprise')).toBeInTheDocument();
			expect(screen.getByLabelText('Nom de l’entreprise ou de l’employeur')).toBeInTheDocument();
			expect(screen.getByText('Adresse mail de contact')).toBeInTheDocument();
			expect(screen.getByLabelText('Courte description de l’entreprise (500 caractères maximum)')).toBeInTheDocument();
			expect(screen.getByLabelText('Logo de l’entreprise - lien/URL')).toBeInTheDocument();
			expect(screen.getByLabelText('Lien du site de l’entreprise - lien/URL')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Suivant' })).toBeInTheDocument();
		});

		it('affiche une infobulle pour le champ adresse mail', async () => {
			render(<Entreprise />);
			const champsAdresseMail = screen.getByText('Adresse mail de contact');
			const infobulle = within(champsAdresseMail).getByLabelText('informations supplémentaires');
			expect(infobulle).toBeVisible();
		});

		it('il voit afficher des champs facultatifs', async () => {
			const labelLogo = 'Logo de l’entreprise - lien/URL';
			const labelSite = 'Lien du site de l’entreprise - lien/URL';
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

			const inputNomSociété = screen.getByRole('textbox', { name: 'Nom de l’entreprise ou de l’employeur' });
			await userEvent.type(inputNomSociété, 'Crédit Agricole');

			await BoutonSuivant();

			expect(screen.getByRole('textbox', { name: 'Nom de l’entreprise ou de l’employeur' })).toBeValid();
			expect(screen.getByRole('textbox', { name: 'Adresse mail de contact' })).toBeInvalid();
		});
	});

	describe('quand je saisis une URL vers le logo de l’entreprise', () => {
		describe('et qu’il ne s’agit pas d’une URL', () => {
			it('je vois un message d’erreur', async () => {
				// Given
				render(<Entreprise />);

				// When
				const logoUrlInputText = screen.getByRole('textbox', { name: 'Logo de l’entreprise - lien/URL' });
				await userEvent.type(logoUrlInputText, 'some random text');

				// Then
				expect(logoUrlInputText).toBeInvalid();
			});
		});

		describe('et qu’il s’agit bien d’une URL', () => {
			it('je ne vois rien d’autre que mon url saisie', async () => {
				// Given
				render(<Entreprise />);

				// When
				const logoUrlInputText = screen.getByRole('textbox', { name: 'Logo de l’entreprise - lien/URL' });
				await userEvent.type(logoUrlInputText, 'http://some.random.url.com');

				// Then
				expect(logoUrlInputText).toBeValid();
			});
		});
	});

	describe('quand je saisis une URL vers le site de l’entreprise', () => {
		describe('et qu’il ne s’agit pas d’une URL', () => {
			it('je vois un message d’erreur', async () => {
				// Given
				render(<Entreprise />);

				// When
				const websiteUrlInputText = screen.getByRole('textbox', { name: 'Lien du site de l’entreprise - lien/URL' });
				await userEvent.type(websiteUrlInputText, 'some random text');

				// Then
				expect(websiteUrlInputText).toBeInvalid();
			});
		});

		describe('et qu’il s’agit bien d’une URL', () => {
			it('je ne vois rien d’autre que mon url saisie', async () => {
				// Given
				render(<Entreprise />);

				// When
				const websiteUrlInputText = screen.getByRole('textbox', { name: 'Lien du site de l’entreprise - lien/URL' });
				await userEvent.type(websiteUrlInputText, 'http://some.random.url.com');

				// Then
				expect(websiteUrlInputText).toBeValid();
			});
		});
	});
});

async function BoutonSuivant() {
	const button = screen.getByRole('button', { name: 'Suivant' });
	await userEvent.click(button);
}
