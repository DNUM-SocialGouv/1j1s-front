/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { beforeEach } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Stage from '~/client/components/features/OffreDeStage/Déposer/Étape2Stage/StageDeposerOffreFormulaireÉtape2Stage';
import { mockUseRouter } from '~/client/components/useRouter.mock';

describe('<Stage />', () => {
	beforeEach(() => {
		mockUseRouter({});
	});
	describe('quand l’utilisateur arrive sur la page Stage', () => {
		it('il peut cliquer sur le bouton Retour pour retourner vers l’étape 1' , async () => {
			render(<Stage />);

			const retourLink = screen.getByRole('link', { name: 'Retour à l’étape précédente' });

			expect(retourLink).toHaveAttribute('href', '/stages/deposer-offre');
		});

		it('affiche la deuxième étape de formulaire', () => {
			render(<Stage />);

			expect(screen.getByText('Etape 2 sur 3 : Votre offre de stage')).toBeVisible();
			expect(screen.getByLabelText('Nom de l’offre de stage (200 caractères maximum)')).toBeVisible();
			expect(screen.getByLabelText('Lien sur lequel les candidats pourront postuler ou une adresse e-mail à laquelle envoyer sa candidature')).toBeVisible();
			expect(screen.getByLabelText('Description de l’offre de stage (200 caractères minimum)')).toBeVisible();
			expect(screen.getByText('Date de début du stage')).toBeVisible();
			expect(screen.getByText('Durée du stage')).toBeVisible();
			expect(screen.getByText('Domaine de l’offre de stage')).toBeVisible();
			expect(screen.getByLabelText('Rémunération par mois')).toBeVisible();
			expect(screen.getByText('Télétravail possible')).toBeVisible();
			expect(screen.getByRole('button', { name: 'Suivant' })).toBeVisible();
		});

		it('affiche par défaut le champ date précise de début de stage', () => {
			render(<Stage />);

			expect(screen.getByLabelText('Date précise du début de stage')).toBeVisible();
		});

		it('le champ date de début de début de stage a par défaut la valeur "Je connais la date précise du début de stage"', async () => {
			render(<Stage />);

			expect(screen.getByRole('radio', { name: 'Je connais la date précise du début de stage' })).toBeChecked();
		});

		it('il voit afficher des champs facultatifs', async () => {
			const labelDomaineOffreStage = 'Domaine de l’offre de stage';
			const rémunération = 'Rémunération par mois';
			const télétravailPossible = 'Télétravail possible';
			// Given
			render(<Stage />);

			//When
			await userEvent.type(screen.getByText(labelDomaineOffreStage), 's{backspace}');
			await userEvent.type(screen.getByLabelText(rémunération), 's{backspace}');
			await userEvent.type(screen.getByText(télétravailPossible), 's{backspace}');

			// Then
			expect(screen.getByText(labelDomaineOffreStage)).toBeValid();
			expect(screen.getByLabelText(rémunération)).toBeValid();
			expect(screen.getByText(télétravailPossible)).toBeValid();
		});


		it('affiche les champs date minimum et maximum de début de stage lorsque l’option "Je ne connais pas la date précise du début de stage" est sélectionnée', () => {
			render(<Stage />);

			const radioDatePrecise = screen.getByRole('radio', { name: 'Je ne connais pas la date précise du début de stage' });

			fireEvent.click(radioDatePrecise);

			expect(screen.getByLabelText('Date de début du stage au plus tôt')).toBeVisible();
			expect(screen.getByLabelText('Date de début du stage au plus tard')).toBeVisible();
		});

		it('vérifie que le radio bouton de télétravail soit bien sélectionné', () => {
			render(<Stage />);

			const radioOui = screen.getByRole('radio', { name: 'Oui' });
			const radioNon = screen.getByRole('radio', { name: 'Non' });

			fireEvent.click(radioNon);

			expect(radioOui).not.toBeChecked();
			expect(radioNon).toBeChecked();
		});

		it('affiche le composant avec le bon label et la limite sur le textarea', () => {
			// Given
			const label = 'Description de l’offre de stage (200 caractères minimum)';
			const placeholder = 'Informations sur le stage : les objectifs, les challenges, les missions...';
			const minLengthValue = '200';

			// When
			render(<Stage />);

			// Then
			expect(screen.getByText(label)).toBeVisible();
			expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('minLength', minLengthValue);
		});
	});

	describe('quand l’utilisateur clique sur Suivant mais n’a pas rempli l’étape 2', () => {
		it('il voit des messages d’erreur', async () => {
			render(<Stage />);

			const inputNomOffreStage = screen.getByRole('textbox', { name: 'Nom de l’offre de stage (200 caractères maximum)' });
			await userEvent.type(inputNomOffreStage, 'Chef de projet');

			await BoutonSuivant();

			expect(screen.getByRole('textbox', { name: 'Nom de l’offre de stage (200 caractères maximum)' })).toBeValid();
			expect(screen.getByRole('textbox', { name: 'Lien sur lequel les candidats pourront postuler ou une adresse e-mail à laquelle envoyer sa candidature' })).toBeInvalid();
			expect(screen.getByRole('textbox', { name: 'Description de l’offre de stage (200 caractères minimum)' })).toBeInvalid();
		});
	});

	describe("quand je saisis le titre d'une offre de stage", () => {
		describe('et que le texte saisi dépasse les 200 caractères', () => {
			it('retourne seulement les 200 premiers caractères', async () => {
				// Given
				const longTextToType = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

				// When
				render(<Stage />);
				const inputTextTitreOffreDeStage = screen
					.getByRole('textbox', { name: 'Nom de l’offre de stage (200 caractères maximum)' });
				await userEvent.type(inputTextTitreOffreDeStage, longTextToType);

				// Then
				expect(inputTextTitreOffreDeStage).toHaveDisplayValue(longTextToType.slice(0, 200));
			});
		});

		describe('et que le texte saisi ne dépasse pas les 200 caractères', () => {
			it('retourne tous les caractères saisis', async () => {
				// Given
				const shortTextToType = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
					.slice(0, 200);

				// When
				render(<Stage />);
				const inputTextTitreOffreDeStage = screen
					.getByRole('textbox', { name: 'Nom de l’offre de stage (200 caractères maximum)' });
				await userEvent.type(inputTextTitreOffreDeStage, shortTextToType);

				// Then
				expect(inputTextTitreOffreDeStage).toHaveDisplayValue(shortTextToType);
			});
		});
	});
});

async function BoutonSuivant() {
	const button = screen.getByRole('button', { name: 'Suivant' });
	await userEvent.click(button);
}
