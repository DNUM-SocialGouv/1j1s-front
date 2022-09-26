/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { expect } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import {
  generateRefinementListItem,
  mockUseRefinementList,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';

import { MeilisearchCustomRefinementList } from '../MeilisearchCustomRefinementList';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyed = jest.spyOn(require('react-instantsearch-hooks-web'), 'useRefinementList');

let refineMock: jest.Mock<string>;

describe('MeilisearchCustomRefinementList', () => {
  it('il monte le composant', () => {
    render(<MeilisearchCustomRefinementList attribute={'test'} label={'test'}/>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  describe('Avec 3 objets de filtres possibles dont le premier a pour label "audit" et valeur "auditeur"', () => {
    beforeEach(() => {
      // GIVEN
      refineMock = jest.fn();
      spyed.mockImplementation(() => mockUseRefinementList({
        items: [
          generateRefinementListItem({ label: 'audit', value: 'auditeur' }),
          generateRefinementListItem({}),
          generateRefinementListItem({})]
        ,
        refine: refineMock,
      }));
    });
    it('affiche une liste de 3 éléments', () => {
      render(<MeilisearchCustomRefinementList attribute={'test'} label={'test'}/>);
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
    it('affiche "Audit" comme label du premier élément', () => {
      render(<MeilisearchCustomRefinementList attribute={'test'} label={'test'}/>);
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getAllByRole('listitem').at(0)?.textContent).toEqual('Audit');
    });
    describe('Quand l’utilisateur clique sur le label correspondant au texte "audit"', () => {
      it('appelle la méthode refine une fois', () => {
        render(<MeilisearchCustomRefinementList attribute={'test'} label={'test'}/>);
        fireEvent.click(screen.getByRole('button'));
        const labelAudit = screen.getByLabelText('Audit');
        fireEvent.click(labelAudit);
        expect(refineMock).toHaveBeenCalledTimes(1);
      });
      it('appelle la méthode refine avec la valeur "auditeur"', () => {
        render(<MeilisearchCustomRefinementList attribute={'test'} label={'test'}/>);
        fireEvent.click(screen.getByRole('button'));
        const labelAudit = screen.getByLabelText('Audit');
        fireEvent.click(labelAudit);
        expect(refineMock).toHaveBeenCalledWith('auditeur');
      });
    });
    describe('Quand l’utilisateur clique sur le bouton', () => {
      it('affiche la liste des choix', () => {
        render(<MeilisearchCustomRefinementList attribute={'test'} label={'test'}/>);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('list')).toBeVisible();
      });
    });
    describe('Quand la liste déroulante est déja ouverte et que l’utilisateur clique le bouton', () => {
      it('ferme la liste des choix', async () => {
        render(<MeilisearchCustomRefinementList attribute={'test'} label={'test'}/>);
        fireEvent.click(screen.getByRole('button'));
        // THEN
        fireEvent.click(screen.getByRole('button'));
        expect(screen.queryByRole('list')).toEqual(null);
      });
    });
  });
});
