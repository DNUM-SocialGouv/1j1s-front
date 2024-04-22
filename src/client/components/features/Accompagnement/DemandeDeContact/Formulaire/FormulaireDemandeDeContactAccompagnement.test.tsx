/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireDemandeDeContactAccompagnement,
} from '~/client/components/features/Accompagnement/DemandeDeContact/Formulaire/FormulaireDemandeDeContactAccompagnement';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	anEtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.fixture';
import {
	ÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.service';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aDemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact.fixture';
import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import {
	aContactÉtablissementAccompagnement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.fixture';

describe('FormulaireDemandeDeContactAccompagnement', () => {
	let localisationService: LocalisationService;
	let établissementAccompagnementService: ÉtablissementAccompagnementService;
	const contactÉtablissementAccompagnement = aContactÉtablissementAccompagnement();
	const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
	let onSuccess: () => void;
	let onFailure: () => void;

	beforeEach(() => {
		mockSmallScreen();
		localisationService = aLocalisationService();
		établissementAccompagnementService = anEtablissementAccompagnementService();
		onSuccess = jest.fn();
		onFailure = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	function renderComponent() {
		render(
			<DependenciesProvider localisationService={localisationService}
				établissementAccompagnementService={établissementAccompagnementService}>
				<FormulaireDemandeDeContactAccompagnement
					contactÉtablissementAccompagnement={contactÉtablissementAccompagnement}
					onSuccess={onSuccess}
					onFailure={onFailure}
				/>
			</DependenciesProvider>,
		);
	}

	describe('champ email', () => {
		it('a un champ Adresse e-mail facultatif', async () => {
			const label = 'Adresse e-mail (facultatif) Exemple : jean.dupont@gmail.com';
			renderComponent();
			const inputEmail = screen.getByRole('textbox', { name: label });

			await userEvent.type(inputEmail, 's{backspace}');

			expect(inputEmail).toHaveAttribute('aria-invalid', 'false');
		});

		it('ne prend pas en compte les espaces avant et après', async () => {
			const label = 'Adresse e-mail (facultatif) Exemple : jean.dupont@gmail.com';
			// Given
			renderComponent();

			//When
			const inputEmail = screen.getByRole('textbox', { name: label });
			await userEvent.type(inputEmail, '    mail@avecespace.com   ');

			// Then
			expect(inputEmail).toHaveValue('mail@avecespace.com');
		});
	});


	it('a un champ Commentaire facultatif', async () => {
		const label = 'Commentaires ou autres informations utiles (facultatif)';
		// Given
		renderComponent();

		//When
		const textarea = screen.getByRole('textbox', { name: label });
		await userEvent.type(textarea, 's{backspace}');

		// Then
		expect(screen.getByLabelText(label)).toBeValid();
	});

	it('a un champ Age obligatoire', async () => {
		// Given
		renderComponent();
		// When
		await userEvent.click(screen.getByText('Age'));
		await userEvent.click(screen.getByLabelText(/Nom/));
		// When
		const input = await screen.findByTestId('Select-InputHidden');

		// Then
		expect(input).toBeInvalid();
	});

	describe('quand l’utilisateur souhaite contacter un établissement', () => {
		it('envoie une demande de contact', async () => {
			renderComponent();

			await envoyerDemandeContact();

			expect(établissementAccompagnementService.envoyerDemandeContact).toHaveBeenCalledWith(demandeDeContactAccompagnement);
		});

		it('lorsque l‘envoie est un success appelle onSuccess', async () => {
			renderComponent();

			await envoyerDemandeContact();

			expect(onSuccess).toHaveBeenCalledTimes(1);
		});

		it('lorsque l‘envoie est en erreur appelle onFailure', async () => {
			renderComponent();
			jest.spyOn(établissementAccompagnementService, 'envoyerDemandeContact').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

			await envoyerDemandeContact();

			expect(onFailure).toHaveBeenCalledTimes(1);
		});
	});
});

async function envoyerDemandeContact() {
	const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();

	await userEvent.type(screen.getByRole('textbox', { name: 'Adresse e-mail (facultatif) Exemple : jean.dupont@gmail.com' }), demandeDeContactAccompagnement.email || '');
	await userEvent.type(screen.getByRole('textbox', { name: 'Nom Exemple : Dupont' }), demandeDeContactAccompagnement.nom);
	await userEvent.type(screen.getByRole('textbox', { name: 'Prénom Exemple : Jean' }), demandeDeContactAccompagnement.prénom);
	await userEvent.type(screen.getByRole('textbox', { name: 'Téléphone Exemple : 0606060606' }), demandeDeContactAccompagnement.téléphone);
	await userEvent.type(screen.getByLabelText('Commentaires ou autres informations utiles (facultatif)'), demandeDeContactAccompagnement.commentaire || '');
	const button = screen.getByRole('button', { name: 'Age Exemple : 16 ans' });
	await userEvent.click(button);
	const listbox = screen.getByRole('listbox');
	const input = within(listbox).getByRole('radio', { name: `${demandeDeContactAccompagnement.age.toString()} ans` });
	await userEvent.click(input);
	const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation Exemples : Paris, Béziers…' });
	await userEvent.type(comboboxCommune, 'Paris');
	const resultatCommuneList = await screen.findAllByRole('option');
	await userEvent.click(resultatCommuneList[0]);

	const submitButton = screen.getByRole('button', { name: 'Envoyer mes informations afin d‘être rappelé(e)' });
	await userEvent.click(submitButton);
}
