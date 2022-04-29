/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import {
  screen,
} from '@testing-library/react';
import { fireEvent, render  } from '@tests/fixtures/dependenciesProvider.fixture';

import  Emplois  from '~/pages/emplois';

describe('Emplois', () => {
  it('appelle l\'api emploi au click sur rechercher',  async() => {
    render(<Emplois />);

    // Given
    const rechercherButton = screen.getByRole('button', {
      name: 'Rechercher',
    });

    // When
    fireEvent.submit(rechercherButton);

    const intitulé = 'Barman / Barmaid (H/F)';

    await screen.findByText(intitulé);
    // Then
    expect(screen.getByText(intitulé)).toBeInTheDocument();
  });
});
