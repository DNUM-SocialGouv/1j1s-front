/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import {
	generateRefinementListItem,
	mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';
import resetAllMocks = jest.resetAllMocks;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch'), 'useRefinementList');

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
			render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
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
			render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
			const button = screen.queryByRole('button', { name: 'test' });
			expect(button).toBeInTheDocument();
		});

		it('affiche une liste de 3 éléments', async () => {
			const user = userEvent.setup();
			render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
			const button = screen.getByRole('button');
			await user.click(button);
			screen.getByRole('listbox');
			expect(screen.getAllByRole('checkbox')).toHaveLength(3);
		});

		it('affiche "Audit" comme label du premier élément', async () => {
			const user = userEvent.setup();
			render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
			const button = screen.getByRole('button');
			await user.click(button);
			screen.getByRole('listbox');

			expect(screen.getByRole('checkbox', { name: 'Audit' })).toBeInTheDocument();
		});

		describe('Quand l’utilisateur clique sur le label correspondant au texte "audit"', () => {
			it('appelle la méthode refine une fois', async () => {
				const user = userEvent.setup();

				render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
				const button = screen.getByRole('button');
				await user.click(button);
				screen.getByRole('listbox');

				const labelAudit = screen.getByLabelText('Audit');
				await user.click(labelAudit);

				expect(refineMock).toHaveBeenCalledTimes(1);
			});

			it('appelle la méthode refine avec la valeur "auditeur"', async () => {
				const user = userEvent.setup();
				render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
				const button = screen.getByRole('button');
				await user.click(button);
				screen.getByRole('listbox');

				const labelAudit = screen.getByLabelText('Audit');
				await user.click(labelAudit);

				expect(refineMock).toHaveBeenCalledWith('auditeur');
			});
		});

		describe('Quand la liste déroulante est déja ouverte et que l’utilisateur clique le bouton', () => {
			it('ferme la liste des choix', async () => {
				const user = userEvent.setup();
				render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
				const button = screen.getByRole('button');
				await user.click(button);

				const optionList = screen.getByRole('listbox');
				expect(optionList).toBeInTheDocument();

				await user.click(button);
				expect(optionList).not.toBeInTheDocument();
			});
		});
	});
});

describe('MeilisearchCustomRefinementList Keyboard', () => {
	afterEach(() => {
		resetAllMocks();
	});
	describe('au clavier', () => {

		describe('lorsque je selectionne la première option avec la touche espace', () => {
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

			it('uniquement la première option est séléctionnée, elle est focus et la liste ne se ferme pas', async () => {
				const user = userEvent.setup();

				render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
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

				expect(firstOption).toHaveFocus();

				expect(optionList).toBeVisible();
			});
		});

		describe('lorsque je sélectionne la deuxième option et que la première option est déjà sélectionnée', () => {
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

			it('les deux options sont séléctionnées, le focus est sur la deuxième option et la liste ne se ferme pas', async () => {
				const user = userEvent.setup();

				render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
				const button = screen.getByRole('button');
				button.focus();
				await user.keyboard(KeyBoard.SPACE);
				const optionList = await screen.findByRole('listbox');
				const firstOption = within(optionList).getAllByRole('option')[0];
				const secondOption = within(optionList).getAllByRole('option')[1];

				await user.keyboard(KeyBoard.ARROW_DOWN);
				expect(secondOption).toHaveFocus();

				await user.keyboard(KeyBoard.SPACE);

				expect(firstOption).toHaveAttribute('aria-selected', 'true');
				expect(secondOption).toHaveAttribute('aria-selected', 'true');

				expect(secondOption).toHaveFocus();

				expect(optionList).toBeVisible();
			});
		});

		describe('lorsque l‘utilisateur ferme la liste', () => {
			beforeEach(() => {
				refineMock = jest.fn();
				spyed
					.mockImplementation(() => mockUseRefinementList({
						items: [
							generateRefinementListItem({ isRefined: false, label: 'Appartement', value: 'appartement' }),
							generateRefinementListItem({ isRefined: false, label: 'Résidence', value: 'résidence' }),
						],
						refine: refineMock,
					}));
			});

			it('la liste est fermée et le focus est sur le bouton', async () => {
				const user = userEvent.setup();

				render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
				const button = screen.getByRole('button');
				button.focus();
				await user.keyboard(KeyBoard.SPACE);
				const optionList = await screen.findByRole('listbox');
				const firstOption = within(optionList).getAllByRole('option')[0];

				expect(firstOption).toHaveFocus();

				await user.keyboard(KeyBoard.ESCAPE);
				expect(optionList).not.toBeInTheDocument();
				expect(button).toHaveFocus();
			});
		});
	});
	describe('à la souris', () => {
		describe('lorsque je clique sur la première option', () => {
			beforeEach(() => {
				refineMock = jest.fn();
				spyed
					.mockImplementationOnce(() => mockUseRefinementList({
						items: [
							generateRefinementListItem({ isRefined: false, label: 'Appartement', value: 'appartement' }),
							generateRefinementListItem({ isRefined: false, label: 'Résidence', value: 'résidence' }),
						],
						refine: refineMock,
					})).mockImplementationOnce(() => mockUseRefinementList({
						items: [
							generateRefinementListItem({ isRefined: true, label: 'Appartement', value: 'appartement' }),
							generateRefinementListItem({ isRefined: false, label: 'Résidence', value: 'résidence' }),
						],
						refine: refineMock,
					}));
			});
			it('uniquement la première option est séléctionnée et la liste ne se ferme pas', async () => {
				const user = userEvent.setup();

				render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
				const button = screen.getByRole('button', { name: 'test' });
				await user.click(button);

				const optionList = await screen.findByRole('listbox');
				const firstOption = within(optionList).getAllByRole('option')[0];
				const secondOption = within(optionList).getAllByRole('option')[1];

				await user.click(firstOption);

				expect(firstOption).toHaveAttribute('aria-selected', 'true');
				expect(secondOption).toHaveAttribute('aria-selected', 'false');

				expect(optionList).toBeVisible();
			});
		});

		describe('lorsque je clique la deuxième option et que la première option est déjà sélectionnée', () => {
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
			it('les deux options sont séléctionnées et la liste ne se ferme pas', async () => {
				const user = userEvent.setup();

				render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
				const button = screen.getByRole('button');
				await user.click(button);

				const optionList = await screen.findByRole('listbox');
				const firstOption = within(optionList).getAllByRole('option')[0];
				const secondOption = within(optionList).getAllByRole('option')[1];

				await user.click(secondOption);

				expect(firstOption).toHaveAttribute('aria-selected', 'true');
				expect(secondOption).toHaveAttribute('aria-selected', 'true');

				expect(optionList).toBeVisible();
			});
		});

		describe('lorsque l‘utilisateur ferme la liste', () => {
			beforeEach(() => {
				refineMock = jest.fn();
				spyed
					.mockImplementation(() => mockUseRefinementList({
						items: [
							generateRefinementListItem({ isRefined: false, label: 'Appartement', value: 'appartement' }),
							generateRefinementListItem({ isRefined: false, label: 'Résidence', value: 'résidence' }),
						],
						refine: refineMock,
					}));
			});
			it('lorsqu‘il clique sur le bouton, la liste est fermée et le focus est sur le bouton', async () => {
				const user = userEvent.setup();

				render(<MeilisearchCustomRefinementList attribute="test" label="test"/>);
				const button = screen.getByRole('button');
				await user.click(button);

				await user.keyboard(KeyBoard.ESCAPE);

				expect(button).toHaveFocus();
			});
			it('lorsqu‘il clique en dehors, la liste est fermée et le focus n‘est pas sur le bouton', async () => {
				const user = userEvent.setup();

				render(<>
					<div data-testid={'outside'}></div>
					<MeilisearchCustomRefinementList attribute="test" label="test"/>
				</>);
				const button = screen.getByRole('button');
				await user.click(button);
				await user.click(screen.getByTestId('outside'));

				expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
				expect(button).not.toHaveFocus();
			});
		});
	});
});
