/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import { ListeDesAnnonces } from '~/client/components/features/Logement/ListeDesAnnonces';

const TestComponent = () => {
  return (
    <ol aria-label="Annonces de logement">
	  <li>
		Annonce de Logement
	  </li>
    </ol>
  );
};

describe('ListeDesAnnonces Component', () => {
  describe('Quand la liste des annonces est en cours de chargement', () => {
    it('Affiche un skeleton', () => {
	  render(<ListeDesAnnonces isLoading={true} resultats={<TestComponent/> as React.ReactNode}/>);

      const skeletonList = screen.getByLabelText('...En cours de chargement');
      expect(skeletonList).toBeInTheDocument();
      
    });
  });

  describe('Quand la liste des annonces est chargée', () => {
    it('Affiche une liste d annonces', () => {
	  render(<ListeDesAnnonces isLoading={false} resultats={<TestComponent/> as React.ReactNode}/>);

	  const annoncesDeLogementList = screen.getByLabelText('Annonces de logement');
	  expect(annoncesDeLogementList).toBeInTheDocument();

	  const skeletonList = screen.queryByLabelText('...En cours de chargement');
	  expect(skeletonList).not.toBeInTheDocument();
    });
  });
});
