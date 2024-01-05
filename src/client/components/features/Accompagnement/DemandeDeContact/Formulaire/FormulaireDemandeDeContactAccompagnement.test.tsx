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
	anÉtablissementAccompagnementService,
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
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';

describe('FormulaireDemandeDeContactAccompagnement', () => {
	let localisationService: LocalisationService;
	let établissementAccompagnementService: ÉtablissementAccompagnementService;
	const contactÉtablissementAccompagnement = aContactÉtablissementAccompagnement();
	const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
	let isSuccessOnSubmit: () => void;

	beforeEach(() => {
		mockSmallScreen();
		localisationService = aLocalisationService();
		établissementAccompagnementService = anÉtablissementAccompagnementService();
		isSuccessOnSubmit = jest.fn();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	function renderComponent() {
		render(
			<DependenciesProvider localisationService={localisationService} établissementAccompagnementService={établissementAccompagnementService}>
				<FormulaireDemandeDeContactAccompagnement
					contactÉtablissementAccompagnement={contactÉtablissementAccompagnement}
					isSuccessOnSubmit={isSuccessOnSubmit}
				/>
			</DependenciesProvider>,
		);
	}

	it('a un champ Adresse e-mail facultatif', async () => {
		const label = 'Adresse e-mail (facultatif)';
		// Given
		renderComponent();

		//When
		await userEvent.type(screen.getByLabelText(label), 's{backspace}');

		// Then
		expect(screen.getByLabelText(label)).toBeValid();
	});

	it('a un champ Commentaire facultatif', async () => {
		const label = 'Commentaires ou autres informations utiles (facultatif)';
		// Given
		renderComponent();

		//When
		await userEvent.type(screen.getByLabelText(label), 's{backspace}');

		// Then
		expect(screen.getByLabelText(label)).toBeValid();
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

	describe('quand l’utilisateur souhaite contacter un établissement', () => {
		it('envoie une demande de contact', async () => {
			renderComponent();

			await envoyerDemandeContact();

			expect(établissementAccompagnementService.envoyerDemandeContact).toHaveBeenCalledWith(demandeDeContactAccompagnement);
		});

		it('lorsque l‘envoie est un success appelle isSuccessOnSubmit à true', async () => {
			renderComponent();

			await envoyerDemandeContact();

			expect(isSuccessOnSubmit).toHaveBeenCalledWith(true);
		});

		it('lorsque l‘envoie est en erreur appelle isSuccessOnSubmit à false', async () => {
			renderComponent();
			jest.spyOn(établissementAccompagnementService, 'envoyerDemandeContact').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

			await envoyerDemandeContact();

			expect(isSuccessOnSubmit).toHaveBeenCalledWith(false);
		});
	});
});

async function envoyerDemandeContact() {
	const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();

	await userEvent.type(screen.getByLabelText('Adresse e-mail (facultatif)'), demandeDeContactAccompagnement.email || '');
	await userEvent.type(screen.getByLabelText('Nom'), demandeDeContactAccompagnement.nom);
	await userEvent.type(screen.getByLabelText('Prénom'), demandeDeContactAccompagnement.prénom);
	await userEvent.type(screen.getByLabelText('Téléphone'), demandeDeContactAccompagnement.téléphone);
	await userEvent.type(screen.getByLabelText('Commentaires ou autres informations utiles (facultatif)'), demandeDeContactAccompagnement.commentaire || '');
	const button = screen.getByRole('button', { name: 'Age' });
	await userEvent.click(button);
	const listbox = screen.getByRole('listbox');
	const input = within(listbox).getByRole('radio', { name: `${demandeDeContactAccompagnement.age.toString()} ans` });
	await userEvent.click(input);
	const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
	await userEvent.type(comboboxCommune, 'Paris');
	const resultatCommuneList = await screen.findAllByRole('option');
	await userEvent.click(resultatCommuneList[0]);

	const submitButton = screen.getByRole('button', { name: 'Envoyer mes informations afin d‘être rappelé(e)' });
	await userEvent.click(submitButton);
}
