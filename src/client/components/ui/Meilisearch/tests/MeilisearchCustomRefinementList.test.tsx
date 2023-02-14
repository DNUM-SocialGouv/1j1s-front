/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import {
	generateRefinementListItem,
	mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch-hooks-web'), 'useRefinementList');

let refineMock: jest.Mock<string>;

describe('MeilisearchCustomRefinementList', () => {
	describe('lorsque la liste des suggestions est vide', () => {
		beforeEach(() => {
			refineMock = jest.fn();
			spyed
				.mockImplementation(() => mockUseRefinementList({
					items: [],
					refine: refineMock,
				}));
		});
		it('affiche un message informatif dans à la place de la liste de suggestions', async () => {
			render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
			const button = screen.queryByRole('button', { name: 'test' });

			expect(button).not.toBeInTheDocument();

		});
	});

	describe('Avec 3 objets de filtres possibles dont le premier a pour label "audit" et valeur "auditeur"', () => {
		beforeEach(() => {
			// GIVEN
			refineMock = jest.fn();
			spyed.mockImplementation(() => mockUseRefinementList({
				items: [
					generateRefinementListItem({ label: 'audit', value: 'auditeur' }),
					generateRefinementListItem({ label: 'dev', value: 'developpeur' }),
					generateRefinementListItem({ label: 'cuisinier', value: 'cuisinier' }),
				]
				,
				refine: refineMock,
			}));
		});
		it('monte le composant', async () => {
			render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
			const button = screen.queryByRole('button', { name: 'test' });
			expect(button).toBeInTheDocument();
		});

		it('affiche une liste de 3 éléments', async () => {
			const user = userEvent.setup();
			render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
			const button = screen.getByRole('button');
			user.click(button);
			await screen.findByRole('listbox');
			expect(screen.getAllByRole('checkbox')).toHaveLength(3);
		});

		it('affiche "Audit" comme label du premier élément', async () => {
			const user = userEvent.setup();
			render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
			const button = screen.getByRole('button');
			user.click(button);
			await screen.findByRole('listbox');

			expect(screen.getByRole('checkbox', { name: 'Audit' })).toBeInTheDocument();
		});

		describe('Quand l’utilisateur clique sur le label correspondant au texte "audit"', () => {
			it('appelle la méthode refine une fois', async () => {
				const user = userEvent.setup();

				render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
				const button = screen.getByRole('button');
				user.click(button);
				await screen.findByRole('listbox');

				const labelAudit = screen.getByLabelText('Audit');
				await user.click(labelAudit);

				expect(refineMock).toHaveBeenCalledTimes(1);
			});

			it('appelle la méthode refine avec la valeur "auditeur"', async () => {
				const user = userEvent.setup();
				render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
				const button = screen.getByRole('button');
				user.click(button);
				await screen.findByRole('listbox');

				const labelAudit = screen.getByLabelText('Audit');
				await user.click(labelAudit);

				expect(refineMock).toHaveBeenCalledWith('auditeur');
			});
		});

		describe('Quand la liste déroulante est déja ouverte et que l’utilisateur clique le bouton', () => {
			it('ferme la liste des choix', async () => {
				const user = userEvent.setup();
				render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
				const button = screen.getByRole('button');
				user.click(button);

				const optionList = await screen.findByRole('listbox');
				expect(optionList).toBeInTheDocument();

				await user.click(button);
				expect(optionList).not.toBeInTheDocument();
			});
		});
	});
});

describe('MeilisearchCustomRefinementList Keyboard', () => {
	describe('lorsque l‘utilisateur sélectionne la première option', () => {
		beforeEach(() => {
			refineMock = jest.fn();
			spyed
				.mockImplementationOnce(() => mockUseRefinementList({
					items: [
						generateRefinementListItem({ isRefined: false, label: 'Appartement', value: 'appartement' }),
						generateRefinementListItem({ isRefined: false, label: 'Résidence', value: 'résidence' }),
					],
					refine: refineMock,
				}))
				.mockImplementationOnce(() => mockUseRefinementList({
					items: [
						generateRefinementListItem({ isRefined: true, label: 'Appartement', value: 'appartement' }),
						generateRefinementListItem({ isRefined: false, label: 'Résidence', value: 'résidence' }),
					],
					refine: refineMock,
				}));
		});
		it('sélectionne la première option avec la touche space ET ne ferme pas la liste des options', async () => {
			const user = userEvent.setup();

			render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
			const button = screen.getByRole('button', { name: 'test' });
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			const optionList = await screen.findByRole('listbox');
			const firstOption = within(optionList).getAllByRole('option')[0];
			const secondOption = within(optionList).getAllByRole('option')[1];

			expect(firstOption).toHaveFocus();

			await user.keyboard(KeyBoard.SPACE);

			expect(firstOption).toHaveAttribute('aria-selected', 'true');
			expect(secondOption).toHaveAttribute('aria-selected', 'false');

			expect(optionList).toBeInTheDocument();

		});
	});

	describe('lorsque l‘utilisateur sélectionne la deuxième option et que la première option est déjà sélectionnée', () => {
		beforeEach(() => {
			refineMock = jest.fn();
			spyed
				.mockImplementationOnce(() => mockUseRefinementList({
					items: [
						generateRefinementListItem({ isRefined: true, label: 'Appartement', value: 'appartement' }),
						generateRefinementListItem({ isRefined: false, label: 'Résidence', value: 'résidence' }),
					],
					refine: refineMock,
				}))
				.mockImplementationOnce(() => mockUseRefinementList({
					items: [
						generateRefinementListItem({ isRefined: true, label: 'Appartement', value: 'appartement' }),
						generateRefinementListItem({ isRefined: true, label: 'Résidence', value: 'résidence' }),
					],
					refine: refineMock,
				}));
		});
		it('sélectionne la première option avec la touche space ET ne ferme pas la liste des options', async () => {
			const user = userEvent.setup();

			render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			const optionList = await screen.findByRole('listbox');
			const firstOption = within(optionList).getAllByRole('option')[0];
			const secondOption = within(optionList).getAllByRole('option')[1];

			expect(firstOption).toHaveFocus();

			expect(optionList).toBeInTheDocument();

			await user.keyboard(KeyBoard.ARROW_DOWN);
			expect(secondOption).toHaveFocus();

			await user.keyboard(KeyBoard.SPACE);

			expect(firstOption).toHaveAttribute('aria-selected', 'true');
			expect(secondOption).toHaveAttribute('aria-selected', 'true');
			expect(optionList).toBeInTheDocument();

			await user.keyboard(KeyBoard.ESCAPE);
			expect(optionList).not.toBeInTheDocument();
		});
	});

	describe('lorsque l‘utilisateur sélectionne une option et ferme la liste', () => {
		beforeEach(() => {
			refineMock = jest.fn();
			spyed
				.mockImplementationOnce(() => mockUseRefinementList({
					items: [
						generateRefinementListItem({ isRefined: false, label: 'Appartement', value: 'appartement' }),
						generateRefinementListItem({ isRefined: false, label: 'Résidence', value: 'résidence' }),
					],
					refine: refineMock,
				}))
				.mockImplementationOnce(() => mockUseRefinementList({
					items: [
						generateRefinementListItem({ isRefined: true, label: 'Appartement', value: 'appartement' }),
						generateRefinementListItem({ isRefined: false, label: 'Résidence', value: 'résidence' }),
					],
					refine: refineMock,
				}));
		});
		it('sélectionne la première option avec la touche space ET ferme la liste des options avec la touche escape', async () => {
			const user = userEvent.setup();

			render(<MeilisearchCustomRefinementList attribute='test' label='test' />);
			const button = screen.getByRole('button');
			button.focus();
			await user.keyboard(KeyBoard.SPACE);
			const optionList = await screen.findByRole('listbox');
			const firstOption = within(optionList).getAllByRole('option')[0];
			const secondOption = within(optionList).getAllByRole('option')[1];

			expect(firstOption).toHaveFocus();
			expect(optionList).toBeInTheDocument();
			await user.keyboard(KeyBoard.SPACE);

			expect(firstOption).toHaveAttribute('aria-selected', 'true');
			expect(secondOption).toHaveAttribute('aria-selected', 'false');
			expect(optionList).toBeInTheDocument();

			await user.keyboard(KeyBoard.ESCAPE);
			expect(optionList).not.toBeInTheDocument();
		});
	});
});
