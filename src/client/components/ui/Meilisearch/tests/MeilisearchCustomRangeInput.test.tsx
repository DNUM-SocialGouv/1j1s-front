/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import {
	render,
	screen,
	within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MeilisearchCustomRangeInput } from '~/client/components/ui/Meilisearch/MeilisearchCustomRangeInput';
import {
	mockUseRangeInput,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyOnUseRange = jest.spyOn(require('react-instantsearch-hooks-web'), 'useRange');

let refineMock: jest.Mock<string>;

const renderMeilisearchCustomRangeInputComponent = () => {
	render(
		<MeilisearchCustomRangeInput
			attribute='test'
			label='test-label'
			placeholder='test-placeholder'
			unite='test-unité'
			min={20}
			max={200}
		/>,
	);
};

describe('MeilisearchCustomRangeInput', ()=> {
	beforeEach(() => {
		refineMock = jest.fn();
		spyOnUseRange.mockImplementation(() => mockUseRangeInput({
			refine: refineMock,
		}));
	});

	it('monte le composant', ()=> {
		renderMeilisearchCustomRangeInputComponent();
		const meilisearchCustomRangeInputComponent = screen.getByLabelText('test-label');
		expect(meilisearchCustomRangeInputComponent).toBeInTheDocument();
	});

	it('contient deux champs inputs de type number', async () => {
		const user = userEvent.setup();
		renderMeilisearchCustomRangeInputComponent();
		const button = screen.getByRole('button');

		await user.click(button);
		const inputMin = screen.getByLabelText('Minimum');
		const inputMax = screen.getByLabelText('Maximum');

		expect(inputMin).toBeInTheDocument();
		expect(inputMin).toHaveAttribute('type','number');

		expect(inputMax).toBeInTheDocument();
		expect(inputMax).toHaveAttribute('type','number');
	});

	it('contient un bouton Appliquer', async () => {
		const user = userEvent.setup();
		renderMeilisearchCustomRangeInputComponent();
		const meilisearchCustomRangeInputComponent = screen.getByRole('button');

		await user.click(meilisearchCustomRangeInputComponent);

		const groupInputs = screen.getByRole('group');
		const submitButton = within(groupInputs).getByRole('button');

		expect(submitButton).toBeInTheDocument();
	});

	describe('quand on renseigne les champs minimum et maximum', () => {
		it('appelle la fonction refine avec les valeurs renseignées', async () => {
			const user = userEvent.setup();
			renderMeilisearchCustomRangeInputComponent();
			const meilisearchCustomRangeInputComponent = screen.getByRole('button');

			await user.click(meilisearchCustomRangeInputComponent);

			const inputMin = screen.getByLabelText('Minimum');
			await user.type(inputMin, '12');
			const inputMax = screen.getByLabelText('Maximum');
			await user.type(inputMax, '50');

			const groupInputs = screen.getByRole('group');
			const submitButton = within(groupInputs).getByRole('button');
			await user.click(submitButton);

			expect(refineMock).toHaveBeenCalledTimes(1);
			expect(refineMock).toHaveBeenCalledWith([12, 50]);
		});

		it('affiche dans le placeholder la bonne saisie', async () => {
			const user = userEvent.setup();
			renderMeilisearchCustomRangeInputComponent();
			const meilisearchCustomRangeInputComponent = screen.getByRole('button');

			await user.click(meilisearchCustomRangeInputComponent);

			const inputMin = screen.getByLabelText('Minimum');
			await user.type(inputMin, '12');
			const inputMax = screen.getByLabelText('Maximum');
			await user.type(inputMax, '50');

			expect(meilisearchCustomRangeInputComponent).toHaveTextContent('De 12 test-unité à 50 test-unité');
		});

		it('ferme l‘affichage des champs au click sur le bouton Appliquer', async () => {
			const user = userEvent.setup();
			renderMeilisearchCustomRangeInputComponent();
			const meilisearchCustomRangeInputComponent = screen.getByRole('button');

			await user.click(meilisearchCustomRangeInputComponent);

			const inputMin = screen.getByLabelText('Minimum');
			await user.type(inputMin, '12');
			const inputMax = screen.getByLabelText('Maximum');
			await user.type(inputMax, '50');

			const groupInputs = screen.getByRole('group');
			const submitButton = within(groupInputs).getByRole('button');
			await user.click(submitButton);

			expect(groupInputs).not.toBeInTheDocument();
		});
	});

	describe('quand on renseigne seulement le champ minimum', () => {
		it('appelle la fonction refine avec la valeur min et undefined pour le max', async () => {
			const user = userEvent.setup();
			renderMeilisearchCustomRangeInputComponent();
			const meilisearchCustomRangeInputComponent = screen.getByRole('button');

			await user.click(meilisearchCustomRangeInputComponent);

			const inputMin = screen.getByLabelText('Minimum');
			await user.type(inputMin, '12');


			const groupInputs = screen.getByRole('group');
			const submitButton = within(groupInputs).getByRole('button');
			await user.click(submitButton);

			expect(refineMock).toHaveBeenCalledTimes(1);
			expect(refineMock).toHaveBeenCalledWith([12, undefined]);
		});

		it('affiche dans le placeholder la bonne saisie', async () => {
			const user = userEvent.setup();
			renderMeilisearchCustomRangeInputComponent();
			const meilisearchCustomRangeInputComponent = screen.getByRole('button');

			await user.click(meilisearchCustomRangeInputComponent);

			const inputMin = screen.getByLabelText('Minimum');
			await user.type(inputMin, '12');
			expect(meilisearchCustomRangeInputComponent).toHaveTextContent('A partir de 12 test-unité');
		});
	});

	describe('quand on renseigne seulement le champ maximum', () => {
		it('appelle la fonction refine avec la valeur max et undefined pour le min', async () => {
			const user = userEvent.setup();
			renderMeilisearchCustomRangeInputComponent();
			const meilisearchCustomRangeInputComponent = screen.getByRole('button');

			await user.click(meilisearchCustomRangeInputComponent);

			const inputMax = screen.getByLabelText('Maximum');
			await user.type(inputMax, '50');


			const groupInputs = screen.getByRole('group');
			const submitButton = within(groupInputs).getByRole('button');
			await user.click(submitButton);

			expect(refineMock).toHaveBeenCalledTimes(1);
			expect(refineMock).toHaveBeenCalledWith([undefined, 50]);
		});

		it('affiche dans le placeholder la bonne saisie', async () => {
			const user = userEvent.setup();
			renderMeilisearchCustomRangeInputComponent();
			const meilisearchCustomRangeInputComponent = screen.getByRole('button');

			await user.click(meilisearchCustomRangeInputComponent);

			const inputMax = screen.getByLabelText('Maximum');
			await user.type(inputMax, '50');
			expect(meilisearchCustomRangeInputComponent).toHaveTextContent('Jusqu‘à 50 test-unité');
		});
	});
  
});
