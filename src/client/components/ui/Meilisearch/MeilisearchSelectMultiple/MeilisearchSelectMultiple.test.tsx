/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import {
	MeilisearchSelectMultiple,
} from '~/client/components/ui/Meilisearch/MeilisearchSelectMultiple/MeilisearchSelectMultiple';
import {
	generateRefinementListItem,
	mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/mockMeilisearchUseFunctions';
import { mockScrollIntoView } from '~/client/components/window.mock';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const spyed = jest.spyOn(require('react-instantsearch'), 'useRefinementList');

describe('MeilisearchSelectMultiple', () => {
	beforeEach(() => {
		mockScrollIntoView();
	});

	it('je vois le select avec son label', () => {
		render(<MeilisearchSelectMultiple attribute="test" label="test"/>);

		const select = screen.getByRole('combobox', { name: 'test' });
		expect(select).toBeVisible();
	});

	it('le label des options débute par une majuscule', async () => {
		const user = userEvent.setup();
		spyed.mockImplementation(() => mockUseRefinementList({
			items: [
				generateRefinementListItem({ label: 'audit', value: 'auditeur' }),
				generateRefinementListItem({ label: 'dev', value: 'developpeur' }),
			],
			refine: jest.fn(),
		}));

		render(<MeilisearchSelectMultiple attribute="test" label="test"/>);

		await user.click(screen.getByRole('combobox', { name: 'test' }));

		expect(screen.getByRole('option', { name: 'Audit' })).toBeVisible();
		expect(screen.getByRole('option', { name: 'Dev' })).toBeVisible();
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

		render(<MeilisearchSelectMultiple attribute="test" label="test"/>);

		await user.click(screen.getByRole('combobox', { name: 'test' }));
		await user.click(screen.getByRole('option', { name: 'Audit' }));

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

		render(<MeilisearchSelectMultiple attribute="test" label="test"/>);

		expect(screen.getByRole('option', { hidden: true, name: 'Audit' })).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('option', { hidden: true, name: 'Dev' })).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('option', { hidden: true, name: 'Cuisinier' })).toHaveAttribute('aria-selected', 'false');
	});
});
