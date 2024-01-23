/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import {
	render,
	screen,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Entreprise from '~/client/components/features/OffreDeStage/Déposer/Étape1Entreprise/StageDeposerOffreFormulaireÉtape1Entreprise';
import { mockUseRouter } from '~/client/components/useRouter.mock';

describe('<Entreprise />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});

	describe('quand l’utilisateur arrive sur la page Entreprise', () => {
		it('affiche la première étape de formulaire', () => {
			render(<Entreprise />);

			expect(screen.getByText('Étape 1 sur 3 : Votre entreprise')).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'Nom de l’entreprise ou de l’employeur Exemples : Crédit Agricole, SNCF…' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'Adresse mail de contact Exemple : contactRH@example.com' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'Courte description de l’entreprise (500 caractères maximum)' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'Logo de l’entreprise - lien/URL Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3…' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'Lien du site de l’entreprise - lien/URL Exemple : https://1jeune1solution.gouv.fr' })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Suivant' })).toBeInTheDocument();
		});

		describe('champ adresse mail', () => {
			it('le champ adresse mail donne une indication sur l’usage de celle-ci', async () => {
				render(<Entreprise />);

				const emailInput = screen.getByRole('textbox', { name: 'Adresse mail de contact Exemple : contactRH@example.com' });

				expect(emailInput).toHaveAccessibleDescription(expect.stringContaining('Cette adresse de contact sera utilisée dans le cas où il manquerait des informations pour valider votre demande, ou pour vous informer du statut de cette dernière. Cette adresse peut donc être différente de l’adresse sur laquelle il faudra candidater.'));
			});

			it('lorsque je remplis le champ email avec des espaces avant et après, ils sont pas pris en compte', async () => {
				const user = userEvent.setup();

				render(<Entreprise />);
				const mailInput = screen.getByRole('textbox', { name : /Adresse mail/ });

				await user.type(mailInput, '     mail@avecespaces.com    ');
				expect(mailInput).toHaveValue('mail@avecespaces.com');
			});
		});


		it('il voit afficher des champs facultatifs', async () => {
			const labelLogo = 'Logo de l’entreprise - lien/URL Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3…';
			const labelSite = 'Lien du site de l’entreprise - lien/URL Exemple : https://1jeune1solution.gouv.fr';
			// Given
			render(<Entreprise />);
			const logoEntrepriseInput = screen.getByRole('textbox', { name: labelLogo });
			const siteEntrepriseInput = screen.getByRole('textbox', { name : labelSite });

			// When
			await userEvent.type(logoEntrepriseInput, 's{backspace}');
			await userEvent.type(siteEntrepriseInput, 's{backspace}');

			// Then
			expect(logoEntrepriseInput).toBeValid();
			expect(siteEntrepriseInput).toBeValid();
		});
	});

	describe('quand l’utilisateur clique sur Suivant mais n’a pas rempli l’étape 1', () => {
		it('il voit une erreur native sur le premier champ obligatoire mais non rempli', async () => {
			render(<Entreprise />);

			const inputNomSociété = screen.getByRole('textbox', { name: 'Nom de l’entreprise ou de l’employeur Exemples : Crédit Agricole, SNCF…' });
			await userEvent.type(inputNomSociété, 'Crédit Agricole');

			await BoutonSuivant();

			expect(inputNomSociété).toBeValid();
			expect(screen.getByRole('textbox', { name: 'Adresse mail de contact Exemple : contactRH@example.com' })).toBeInvalid();
		});
	});

	describe('quand je saisis une URL vers le logo de l’entreprise', () => {
		describe('et qu’il ne s’agit pas d’une URL', () => {
			it('je vois un message d’erreur', async () => {
				// Given
				render(<Entreprise />);

				// When
				const logoUrlInputText = screen.getByRole('textbox', { name: 'Logo de l’entreprise - lien/URL Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3…' });
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
				const logoUrlInputText = screen.getByRole('textbox', { name: 'Logo de l’entreprise - lien/URL Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3…' });
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
				const websiteUrlInputText = screen.getByRole('textbox', { name: 'Lien du site de l’entreprise - lien/URL Exemple : https://1jeune1solution.gouv.fr' });
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
				const websiteUrlInputText = screen.getByRole('textbox', { name: 'Lien du site de l’entreprise - lien/URL Exemple : https://1jeune1solution.gouv.fr' });
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
