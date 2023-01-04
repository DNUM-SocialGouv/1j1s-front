/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormulaireDeContactCEJ from '~/client/components/features/ContratEngagementJeune/Rappel/FormulaireDeContact/FormulaireDeContactCEJ';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { DemandeDeContactCEJValidator } from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import { createSuccess } from '~/server/errors/either';

jest.setTimeout(10000);
describe('<FormulaireDeContactCEJ />', () => {

	function renderComponent() {
		const onSuccess = jest.fn();
		const anDemandeDeContactService = (): DemandeDeContactService => ({
			envoyerPourLeCEJ: jest.fn().mockResolvedValue(createSuccess(undefined)),
			envoyerPourLesEntreprisesSEngagent: jest.fn().mockResolvedValue(createSuccess(undefined)),
		} as unknown as DemandeDeContactService);
		const demandeDeContactServiceMock = anDemandeDeContactService();
		const localisationService = aLocalisationService();

		render(
			<DependenciesProvider demandeDeContactService={demandeDeContactServiceMock} localisationService={localisationService}>
				<FormulaireDeContactCEJ onSuccess={onSuccess}>
          Revenir
				</FormulaireDeContactCEJ>
			</DependenciesProvider>,
		);
		return { demandeDeContactServiceMock, onSuccess };
	}

	it('affiche un formulaire de rappel', async () => {
		// Given
		renderComponent();
		// When
		// Then
		expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
		expect(screen.getByLabelText('Nom')).toBeInTheDocument();
		expect(screen.getByLabelText('Adresse email')).toBeInTheDocument();
		expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
		expect(screen.getByLabelText('Age', { exact: true })).toBeInTheDocument();
		expect(screen.getByLabelText('Localisation')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeInTheDocument();
	});

	describe('Quand les champs sont obligatoires', () => {
		it.each([
			{ label: 'Prénom' },
			{ label: 'Nom' },
			{ label: 'Adresse email' },
			{ label: 'Age' },
			{ label: 'Localisation' },
		])('pour %j on retourne required', (queryParametersToTestRequired) => {
			const result = DemandeDeContactCEJValidator.validate(queryParametersToTestRequired);

			expect(result.error).toBeDefined();

		});
	});

	it('a un champ Age obligatoire', async () => {
		// Given
		renderComponent();
		// When
		await userEvent.click(screen.getByText('Age'));
		await userEvent.click(screen.getByText('Nom'));
		// When
		const input = await screen.findByTestId('Select-InputHidden');

		// Then
		expect(input).toBeInvalid();
	});
	describe('Quand l’utilisateur clique sur Envoyer la demande', () => {
		describe('et que le formulaire est valide', () => {
			it('appelle l’api avec les paramètres saisis dans le formulaire', async () => {
				// Given
				const { demandeDeContactServiceMock } = renderComponent();

				// When
				await remplirFormulaireDeContact({
					age: '19 ans',
					email: 'toto@msn.fr',
					nom: 'Mc Totface',
					prénom: 'Toto',
					téléphone: '0123456789',
				});

				// Then
				expect(demandeDeContactServiceMock.envoyerPourLeCEJ).toHaveBeenCalledWith({
					age: 19,
					codeCommune: '75056',
					email: 'toto@msn.fr',
					nom: 'Mc Totface',
					nomCommune: 'Paris',
					prénom: 'Toto',
					téléphone: '0123456789',
				});
			});
			it('appelle la propriété onSuccess', async () => {
				// Given
				const { onSuccess } = renderComponent();

				// When
				await remplirFormulaireDeContact({
					age: '19 ans',
					email: 'toto@msn.fr',
					nom: 'Mc Totface',
					prénom: 'Toto',
					téléphone: '0123456789',
				});

				// Then
				expect(onSuccess).toHaveBeenCalled();
			});
		});
	});
	describe('quand on clique sur politique de confidentialité', () => {
		it('ça te renvoie vers la page confidentialite', () => {
			// Given
			const politiqueConfidentialité = 'politique de confidentialité';

			renderComponent();

			// Then
			const link = screen.getByRole('link', { name: politiqueConfidentialité });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('/confidentialite'));
		});
	});
	describe('quand on clique sur CGU', () => {
		it('ça te renvoie vers la page cgu', () => {
			// Given
			const cgu = 'CGU';

			renderComponent();

			// Then
			const link = screen.getByRole('link', { name: cgu });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('/cgu'));
		});
	});
});

/* eslint-disable jest/no-export */
type ContactInputs = Record<'prénom' | 'nom' | 'téléphone' | 'email' | 'age' , string>

async function remplirFormulaireDeContact(data: ContactInputs, user = userEvent.setup(), submit = true) {
	await user.type(screen.getByText('Prénom'), data.prénom);
	await user.type(screen.getByText('Nom'), data.nom);
	await user.type(screen.getByText('Téléphone'), data.téléphone);
	await user.type(screen.getByText('Adresse email'), data.email);

	const inputCommune = screen.getByTestId('InputCommune');
	await userEvent.type(inputCommune, 'Paris');
	const résultatsCommune = await screen.findByTestId('RésultatsCommune');
	const résultatCommuneList = within(résultatsCommune).getAllByRole('option');
	await userEvent.click(résultatCommuneList[0]);

	await user.click(screen.getByText('Age'));
	await user.click(screen.getByText(data.age));
	if (submit) {
		await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));
	}
}

