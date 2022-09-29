/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import DecouvrirMesuresEmployeurs
  from '~/client/components/features/JeRecrute/DecouvrirMesuresEmployeurs/DecouvrirMesuresEmployeurs';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('DecouvrirMesuresEmployeurs', () => {

  function renderComponent () {
    render(
      <DependenciesProvider>
        <DecouvrirMesuresEmployeurs />
      </DependenciesProvider>,
    );

  }

  describe('quand on clique sur Découvrir toutes les mesures employeurs', () => {
    it('ça te renvoie vers la page Mesures Employeurs', () => {
      // Given
      const boutonDécouvrir = 'Découvrir toutes les mesures employeurs';

      renderComponent();

      // Then
      const link = screen.getByRole('link', { name: boutonDécouvrir });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expect.stringContaining('/mesures-employeurs'));
    });
  });
});
