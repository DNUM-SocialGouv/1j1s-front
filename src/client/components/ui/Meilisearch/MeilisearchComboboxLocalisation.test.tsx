/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { MeilisearchComboboxLocalisation } from '~/client/components/ui/Meilisearch/MeilisearchComboboxLocalisation';
import {
	generateRefinementListItem,
	mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch'), 'useRefinementList');

describe('MeilisearchComboboxLocalisation', () => {
	it('l‘utilisateur peut intéragir avec le combobox et voir les options', async () => {
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ value: 'Paris' }),
				generateRefinementListItem({ value: 'Marseille' }),
				generateRefinementListItem({ value: 'PACA' }),
				generateRefinementListItem({ value: 'Le Vésinet' })],
			refine: jest.fn(),
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'}/>);
		const combobox = screen.getByRole('combobox', { name: 'Localisation Exemples : Toulouse, Paris…' });
		await user.type(combobox, 'p');

		expect(combobox).toHaveValue('p');
		const options = screen.getAllByRole('option');
		expect(options.length).toBe(2);
		expect(options[0]).toHaveTextContent('Paris');
		expect(options[1]).toHaveTextContent('PACA');
	});

	it('lorsqu‘il n‘y a pas de résultat, l‘utilisateur voit un message', async () => {
		const MESSAGE_PAS_DE_RESULTAT = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un lieu. Exemple : Paris, Marseille …';
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [],
			refine: jest.fn(),
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'}/>);
		const combobox = screen.getByRole('combobox', { name: 'Localisation Exemples : Toulouse, Paris…' });
		await user.type(combobox, 'p');

		const statusPasDeResultat = screen.getByRole('status');
		expect(statusPasDeResultat).toBeVisible();
		expect(statusPasDeResultat).toHaveTextContent(MESSAGE_PAS_DE_RESULTAT);
	});

	it('quand l‘utilisateur séléctionne une option, le champ de saisie se vide et la méthode refine est appelé', async () => {
		const refine = jest.fn();
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ value: 'Paris' }),
				generateRefinementListItem({ value: 'Marseille' }),
				generateRefinementListItem({ value: 'PACA' }),
				generateRefinementListItem({ value: 'Le Vésinet' })],
			refine,
		}));
		const user = userEvent.setup();

		render(<MeilisearchComboboxLocalisation attribute={'test'}/>);
		const combobox = screen.getByRole('combobox', { name: 'Localisation Exemples : Toulouse, Paris…' });

		await user.type(combobox, 'p');
		const option = screen.getByRole('option', { name: 'Paris' });
		await user.click(option);

		expect(refine).toHaveBeenCalledTimes(1);
		expect(refine).toHaveBeenCalledWith('Paris');
		expect(combobox).toHaveValue('');
	});
});
