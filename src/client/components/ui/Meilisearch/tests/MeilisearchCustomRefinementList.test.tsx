/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import {
	generateRefinementListItem,
	mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';
import { mockScrollIntoView } from '~/client/components/window.mock';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch'), 'useRefinementList');

describe('MeilisearchCustomRefinementList', () => {
	beforeEach(() => {
		mockScrollIntoView();
	});

	it('je vois le select avec son label', () => {
		render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);

		const select = screen.getByRole('combobox', { name: 'test' });
		expect(select).toBeVisible();
	});

	it('lorsque l‘utilisateur selectionne une option, refine est appelé avec l‘option selectionnée', async () => {
		const user = userEvent.setup();
		const refine = jest.fn();
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ label: 'audit', value: 'auditeur' }),
				generateRefinementListItem({ label: 'dev', value: 'developpeur' }),
			],
			refine,
		}));

		render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);

		await user.click(screen.getByRole('combobox', { name: 'test' }));
		await user.click(screen.getByRole('option', { name: 'audit' }));

		expect(refine).toHaveBeenCalledTimes(1);
		expect(refine).toHaveBeenCalledWith('auditeur');
	});

	it('lorsque l‘utilisateur a séléctionné une option, l‘option est séléctionnée', () => {
		const refine = jest.fn();
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ isRefined: true, label: 'audit', value: 'auditeur' }),
				generateRefinementListItem({ isRefined: true, label: 'dev', value: 'developpeur' }),
				generateRefinementListItem({ isRefined: false, label: 'cuisinier', value: 'cuisinier' }),
			],
			refine,
		}));

		render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);

		expect(screen.getByRole('option', { hidden: true, name: 'audit' })).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('option', { hidden: true, name: 'dev' })).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('option', { hidden: true, name: 'cuisinier' })).toHaveAttribute('aria-selected', 'false');
	});
});
