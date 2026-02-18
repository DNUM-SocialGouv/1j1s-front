import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { MeilisearchRangeForModal } from '~/client/components/ui/Meilisearch/MeilisearchRange/MeilisearchRangeForModal';
import { mockUseRangeInput } from '~/client/components/ui/Meilisearch/mockMeilisearchUseFunctions';

import { useRange } from 'react-instantsearch';
vi.mock('react-instantsearch');

const spyOnUseRange = vi.mocked(useRange);

let refineMock: Mock<string>;

describe('MeilisearchCustomRangeForModalInput', () => {
	beforeEach(() => {
		refineMock = vi.fn();
		spyOnUseRange.mockImplementation(() => mockUseRangeInput({
			refine: refineMock,
		}));
	});

	it('monte le composant', () => {
		render(
			<MeilisearchRangeForModal
				attribute="test"
				nomDeLUnite="Euro"
				unite="€"
				min={20}
				max={200} />,
		);
		expect(screen.getByRole('group')).toBeVisible();
	});

	it('contient deux champs inputs de type number', () => {
		render(
			<MeilisearchRangeForModal
				attribute="test"
				nomDeLUnite="Euro"
				unite="€"
				min={20}
				max={200} />,
		);

		const inputMin = screen.getByLabelText('Minimum');
		const inputMax = screen.getByLabelText('Maximum');

		expect(inputMin).toBeVisible();
		expect(inputMin).toHaveAttribute('type', 'number');

		expect(inputMax).toBeVisible();
		expect(inputMax).toHaveAttribute('type', 'number');
	});

	describe('quand on renseigne les champs minimum et maximum', () => {
		it('appelle la fonction refine deux fois avec les valeurs renseignées', async () => {
			const user = userEvent.setup();
			render(
				<MeilisearchRangeForModal
					attribute="test"
					nomDeLUnite="Euro"
					unite="€"
					min={20}
					max={200} />,
			);

			const inputMin = screen.getByLabelText('Minimum');
			const inputMax = screen.getByLabelText('Maximum');
			await user.type(inputMin, '12');
			await user.type(inputMax, '50');
			await user.tab();

			expect(refineMock).toHaveBeenCalledTimes(2);
			expect(refineMock).toHaveBeenCalledWith([12, 50]);
		});
	});

	describe('quand on renseigne seulement le champ minimum', () => {
		it('appelle la fonction refine avec la valeur min et undefined pour le max', async () => {
			const user = userEvent.setup();
			render(
				<MeilisearchRangeForModal
					attribute="test"
					nomDeLUnite="Euro"
					unite="€"
					min={20}
					max={200} />,
			);

			const inputMin = screen.getByLabelText('Minimum');
			await user.type(inputMin, '12');
			await user.tab();

			expect(refineMock).toHaveBeenCalledTimes(1);
			expect(refineMock).toHaveBeenCalledWith([12, undefined]);
		});

	});

	describe('quand on renseigne seulement le champ maximum', () => {
		it('appelle la fonction refine avec la valeur max et undefined pour le min', async () => {
			const user = userEvent.setup();
			render(
				<MeilisearchRangeForModal
					attribute="test"
					nomDeLUnite="Euro"
					unite="€"
					min={20}
					max={200} />,
			);

			const inputMax = screen.getByLabelText('Maximum');
			await user.type(inputMax, '50');
			await user.tab();

			expect(refineMock).toHaveBeenCalledTimes(1);
			expect(refineMock).toHaveBeenCalledWith([undefined, 50]);
		});
	});
});
