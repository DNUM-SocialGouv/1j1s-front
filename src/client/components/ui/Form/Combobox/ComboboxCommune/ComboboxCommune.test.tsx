/**
 * @jest-environment jsdom
 */


import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createSuccess } from '~/server/errors/either';
import {
	aCommune,
	aCommuneList,
	aRésultatsRechercheCommune,
} from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';
import { aRésultatsRechercheOffre } from '~/server/offres/domain/offre.fixture';

describe('<ComboboxCommune/>', () => {
	it('affiche le combobox', () => {
		const localisationService = aLocalisationService();
		render(<DependenciesProvider localisationService={localisationService}><ComboboxCommune/></DependenciesProvider>);
		expect(screen.getByRole('combobox')).toBeVisible();
	});

	it('accepte un label et fait le lien avec le combobox', () => {
		const localisationService = aLocalisationService();
		render(<DependenciesProvider localisationService={localisationService}>
			<ComboboxCommune label="je suis le label"/>
		</DependenciesProvider>);
		const combobox = screen.getByRole('combobox');
		const label = 'je suis le label';

		expect(combobox).toHaveAccessibleName(label);
		expect(screen.getByText(label)).toBeVisible();
	});

	it('si le label n‘est pas donné, utilise le label par default', () => {
		const localisationService = aLocalisationService();
		render(<DependenciesProvider localisationService={localisationService}>
			<ComboboxCommune/>
		</DependenciesProvider>);
		const combobox = screen.getByRole('combobox');
		const defaultLabel = 'Localisation';

		expect(combobox).toHaveAccessibleName(defaultLabel);
		expect(screen.getByText(defaultLabel)).toBeVisible();
	});

	it('accepte un id', () => {
		const localisationService = aLocalisationService();
		render(<DependenciesProvider localisationService={localisationService}>
			<ComboboxCommune id={'test'}/>
		</DependenciesProvider>);
		const combobox = screen.getByRole('combobox');

		expect(combobox).toHaveAttribute('id', 'test');
	});

	it('accepte un onChange', async () => {
		const user = userEvent.setup();
		const localisationService = aLocalisationService();
		const onChange = jest.fn();

		render(<DependenciesProvider localisationService={localisationService}>
			<ComboboxCommune label={'comboboxLabel'} onChange={onChange}/>
		</DependenciesProvider>);
		const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

		await user.type(combobox, 'a');

		expect(onChange).toHaveBeenCalledTimes(1);
	});

	it('accepte les propriétés du combobox', () => {
		const localisationService = aLocalisationService();
		const onFocus = jest.fn();
		render(<DependenciesProvider localisationService={localisationService}>
			<ComboboxCommune onFocus={onFocus} defaultValue={'defaultValue'}/>
		</DependenciesProvider>);
		const combobox = screen.getByRole('combobox');

		expect(combobox).toHaveValue('defaultValue');
	});

	it('n‘appelle pas le service lorsque l‘utilisateur tappe moins de 3 charactères', async () => {
		const user = userEvent.setup();
		const localisationService = aLocalisationService({
			rechercherCommune: jest.fn(),
		});

		render(<DependenciesProvider localisationService={localisationService}>
			<ComboboxCommune label={'comboboxLabel'}/>
		</DependenciesProvider>);
		const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

		await user.type(combobox, 'ab');

		expect(localisationService.rechercherCommune).not.toHaveBeenCalled();
	});

	describe('lorsque je fais une recherche avec au moins 3 caractères', () => {
		it('appelle le service lorsque l‘utilisateur tappe 3 charactères', async () => {
			const user = userEvent.setup();
			const localisationService = aLocalisationService({
				rechercherCommune: jest.fn(),
			});

			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

			await user.type(combobox, 'abc');

			expect(localisationService.rechercherCommune).toHaveBeenCalledTimes(1);
			expect(localisationService.rechercherCommune).toHaveBeenCalledWith('abc');
		});

		it('affiche les options', async () => {
			const user = userEvent.setup();
			const communeList = aRésultatsRechercheCommune([
				aCommune({ libelle: 'Paris' }),
				aCommune({ libelle: 'Toulon' }),
			]);
			const localisationService = aLocalisationService({
				rechercherCommune: jest.fn(),
			});
			jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(communeList));
			render(<DependenciesProvider localisationService={localisationService}>
				<ComboboxCommune label={'comboboxLabel'}/>
			</DependenciesProvider>);
			const combobox = screen.getByRole('combobox', { name: 'comboboxLabel' });

			await user.type(combobox, 'abc');

			const options = screen.getAllByRole('option');
			expect(options.length).toBe(2);
			expect(options[0]).toBeVisible();
			expect(options[0]).toHaveTextContent('Paris');
			expect(options[1]).toBeVisible();
			expect(options[1]).toHaveTextContent('Toulon');
		});
	});
});
