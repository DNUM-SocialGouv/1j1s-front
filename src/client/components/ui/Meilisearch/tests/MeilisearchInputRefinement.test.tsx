/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { expect } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  generateRefinementListItem,
  mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';

import { MeilisearchInputRefinement } from '../MeilisearchInputRefinement';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch-hooks-web'), 'useRefinementList');

let refineMock: jest.Mock<string>;

describe('MeilisearchInputRefinement', () => {
  it('il monte le composant', () => {
    render(<MeilisearchInputRefinement attribute={'test'}/>);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  describe('Avec une liste de 3 localisations', () => {
    beforeEach(() => {
      // GIVEN
      refineMock = jest.fn();
      spyed.mockImplementation(() => mockUseRefinementList({
        items: [
          generateRefinementListItem({ value: 'Paris' }),
          generateRefinementListItem({ value: 'Marseille' }),
          generateRefinementListItem({ value: 'PACA' })]
        ,
        refine: refineMock,
      }));
    });
    describe('Quand l’utilisateur tape "P" dans le champs localisation', () => {
      it('affiche une liste de 2 éléments avec "Paris" et "PACA"', async () => {
        render(<MeilisearchInputRefinement attribute={'test'}/>);
        const user = userEvent.setup();
        const inputLocalisation = screen.getByRole('textbox');
        await user.type(inputLocalisation, 'p');
        expect(await screen.findAllByRole('option')).toHaveLength(2);
      });
      describe('Quand l’utilisateur clique sur "Paris"', () => {
        it('appelle la méthode refine une fois', async () => {
          render(<MeilisearchInputRefinement attribute={'test'}/>);
          const user = userEvent.setup();
          const inputLocalisation = screen.getByRole('textbox');
          await user.type(inputLocalisation, 'p');
          const optionParis = await screen.findByRole('option', { name: 'Paris' });
          fireEvent.click(optionParis);
          expect(refineMock).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe('Quand l’utilisateur tape "Nantes"', () => {
      it('affiche un message qu’il n’y a pas de résultat', async () => {
        render(<MeilisearchInputRefinement attribute={'test'}/>);
        const user = userEvent.setup();
        const inputLocalisation = screen.getByRole('textbox');
        await user.type(inputLocalisation, 'Nantes');
        expect(await screen.findByTestId('LocalisationNoResultMessage')).toBeInTheDocument();
      });
    });
  });
});
