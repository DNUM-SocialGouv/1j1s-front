/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import FormulaireDeContactCEJ
	from '~/client/components/features/ContratEngagementJeune/DemandeDeContactCEJ/Formulaire/Formulaire';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createSuccess } from '~/server/errors/either';

jest.mock('lodash/debounce', () =>
	jest.fn((fn) => {
		fn.cancel = jest.fn();
		fn.return = jest.fn();
		return fn;
	}));
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
		expect(screen.getByText('Age', { exact: true })).toBeInTheDocument();
		expect(screen.getByRole('combobox', { name: 'Ville' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeInTheDocument();
	});

	it('a un champ Age obligatoire', async () => {
		// Given
		renderComponent();
		// When
		await userEvent.click(screen.getByText('Age'));
		await userEvent.click(screen.getByLabelText('Nom'));
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
				await remplirFormulaireDeContactEtEnvoyer({
					age: '19 ans',
					email: 'toto@msn.fr',
					nom: 'Mc Totface',
					prénom: 'Toto',
					téléphone: '0123456789',
					ville: 'Paris',
				});
				// screen.debug(undefined, Infinity);

				// Then
				expect(demandeDeContactServiceMock.envoyerPourLeCEJ).toHaveBeenCalledWith({
					age: 19,
					codePostal: '75015',
					email: 'toto@msn.fr',
					nom: 'Mc Totface',
					prénom: 'Toto',
					téléphone: '0123456789',
					ville: 'Paris 15e Arrondissement',
				});
			});
			it('appelle la propriété onSuccess', async () => {
				// Given
				const { onSuccess } = renderComponent();

				// When
				await remplirFormulaireDeContactEtEnvoyer({
					age: '19 ans',
					email: 'toto@msn.fr',
					nom: 'Mc Totface',
					prénom: 'Toto',
					téléphone: '0123456789',
					ville: 'Pontoise',
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

type ContactInputs = Record<'prénom' | 'nom' | 'téléphone' | 'email' | 'age' | 'ville', string>

async function remplirFormulaireDeContactEtEnvoyer(data: ContactInputs) {
	const user = userEvent.setup();
	await user.type(screen.getByLabelText('Prénom'), data.prénom);
	await user.type(screen.getByLabelText('Nom'), data.nom);
	await user.type(screen.getByLabelText('Téléphone'), data.téléphone);
	await user.type(screen.getByLabelText('Adresse email'), data.email);

	await user.type(screen.getByRole('combobox', { name: 'Ville' }), data.ville);
	await user.click(await screen.findByText('Paris 15e Arrondissement (75015)'));

	await user.click(screen.getByRole('button', { name: 'Age' }));
	await user.click(screen.getByText(data.age));

	await user.click(screen.getByRole('button', { name: 'Envoyer la demande' }));
}


