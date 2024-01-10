/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Rappel from '~/client/components/features/ContratEngagementJeune/DemandeDeContactCEJ/Rappel';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createSuccess } from '~/server/errors/either';


describe('<Rappel />', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

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
				<Rappel/>
			</DependenciesProvider>,
		);
		return { demandeDeContactServiceMock, onSuccess };
	}

	it('le composant s‘affiche correctement', () => {
		// Given
		// When
		renderComponent();
		// Then
		expect(screen.getByText('Demander à être contacté.e')).toBeVisible();
	});
	describe('Lorsqu‘on clique sur le bouton je souhaite être contacté(e)', () => {
		it('affiche un formulaire de rappel', async () => {
			// Given
			renderComponent();
			// When
			await userEvent.click(screen.getByText('Demander à être contacté.e'));
			// Then
			expect(screen.getByLabelText('Prénom')).toBeVisible();
			expect(screen.getByLabelText('Nom')).toBeVisible();
			expect(screen.getByLabelText('Adresse email')).toBeVisible();
			expect(screen.getByLabelText('Téléphone')).toBeVisible();
			expect(screen.getByText('Age', { exact: true })).toBeVisible();
			expect(screen.getByRole('combobox', { name: 'Ville' })).toBeVisible();

			expect(screen.getByRole('button', { name: 'Envoyer la demande' })).toBeVisible();
		});
	});
});