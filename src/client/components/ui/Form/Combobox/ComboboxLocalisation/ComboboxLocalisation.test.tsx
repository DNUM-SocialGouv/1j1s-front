/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { ComboboxLocalisation } from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aLocalisationService,
	aLocalisationServiceWithEmptyResultat,
} from '~/client/services/localisation/localisation.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';

describe('ComboboxLocalisation', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('vérifie la validité de l’input utilisateur', async () => {
		const user = userEvent.setup();
		const localisationServiceMock = aLocalisationService();

		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<ComboboxLocalisation debounceTimeout={0} />
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'exemple d’input utilisateur');

		expect(localisationServiceMock.isInvalidLocalisationQuery).toHaveBeenCalledWith('exemple d’input utilisateur');
	});

	describe('quand l‘input contient déjà une valeur', () => {
		it('affiche la localisation pré-sélectionnée', () => {
			// GIVEN
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<form aria-label="LeForm">
						<ComboboxLocalisation defaultValue={{
							codeInsee: '75001',
							codePostal: '75001',
							nom: 'Paris',
							type: TypeLocalisation.COMMUNE,
						}}
						/>
					</form>
				</DependenciesProvider>,
			);

			// THEN
			expect(screen.getByRole('form', { name: 'LeForm' })).toHaveFormValues({
				codeLocalisation: '75001',
				codePostalLocalisation: '75001',
				nomLocalisation: 'Paris',
				typeLocalisation: 'COMMUNE',
			});
		});
	});

	it('affiche un message d‘information quand aucun résultat n‘est trouvé', async () => {
		// GIVEN
		const localisationServiceMock = aLocalisationServiceWithEmptyResultat();
		const user = userEvent.setup();

		mockUseRouter({});
		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<ComboboxLocalisation />
			</DependenciesProvider>,
		);
		const inputLocalisation = screen.getByRole('combobox', { name: 'Localisation' });

		// WHEN
		await user.type(inputLocalisation, 'no result');

		// THEN

		const noResultMessage = await screen.findByText('Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, ...' );
		expect(noResultMessage).toBeVisible();
	});

	it('affiche un message indiquant une erreur quand l’appel au service est en échec', async () => {
		const user = userEvent.setup();
		const localisationServiceMock = aLocalisationService();
		jest.spyOn(localisationServiceMock, 'rechercherLocalisation').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<ComboboxLocalisation debounceTimeout={0} />
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'Paris');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Une erreur est survenue lors de la récupération des lieux. Veuillez réessayer plus tard.');
	});

	it('affiche un message invitant à la saisie quand l’input utilisateur est vide', async () => {
		const user = userEvent.setup();
		const localisationServiceMock = aLocalisationService();
		jest.spyOn(localisationServiceMock, 'isInvalidLocalisationQuery').mockReturnValue(true);
		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<ComboboxLocalisation debounceTimeout={0} />
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'pa');
		await user.clear(screen.getByRole('combobox'));

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Commencez à saisir au moins 3 caractères, 2 chiffres d’un département ou les 5 chiffres d’une commune, puis sélectionnez votre localisation');
	});

	it('affiche un message invitant à la saisie quand l’input utilisateur est invalide', async () => {
		const user = userEvent.setup();
		const localisationServiceMock = aLocalisationService();
		jest.spyOn(localisationServiceMock, 'isInvalidLocalisationQuery').mockReturnValue(true);

		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<ComboboxLocalisation debounceTimeout={0} />
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'Pa');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Commencez à saisir au moins 3 caractères, 2 chiffres d’un département ou les 5 chiffres d’une commune, puis sélectionnez votre localisation');
	});

	it('affiche un message de chargement quand la liste de suggestions est en train de charger des résultats', async () => {
		const user = userEvent.setup();
		const localisationServiceMock = aLocalisationService();
		jest.spyOn(localisationServiceMock, 'rechercherLocalisation').mockReturnValue(new Promise(() => {}));
		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<ComboboxLocalisation debounceTimeout={0} />
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'Paris');

		const message = screen.getByRole('status');
		expect(message).toBeVisible();
		expect(message).toHaveTextContent('Chargement ...');
	});

	it('affiche un message d’erreur quand le champ est en erreur', async () => {
		const user = userEvent.setup();
		const localisationServiceMock = aLocalisationService();
		jest.spyOn(localisationServiceMock, 'rechercherLocalisation').mockResolvedValue(createSuccess({
			communeList: [],
			departementList: [],
			regionList: [],
		}));

		render(
			<DependenciesProvider localisationService={localisationServiceMock}>
				<ComboboxLocalisation debounceTimeout={0} />
			</DependenciesProvider>,
		);

		await user.type(screen.getByRole('combobox'), 'test');
		await user.tab();

		const erreur = screen.getByText('Veuillez sélectionner une option dans la liste');
		expect(erreur).toBeVisible();
		const combobox = screen.getByRole('combobox');
		expect(combobox).toHaveAccessibleDescription('Veuillez sélectionner une option dans la liste');
	});
});
