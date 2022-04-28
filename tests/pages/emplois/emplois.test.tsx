/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import {
  screen,
} from '@testing-library/react';

import  Emplois  from '~/pages/emplois';

import { fireEvent,render  } from '../../utils/test-utils';

describe('Emplois', () => {
  it('appelle l\'api emploi au click sur rechercher',  async() => {
    render(<Emplois />);

    // Given
    const rechercherButton = screen.getByRole('button', {
      name: 'Rechercher',
    });

    // When
    fireEvent.submit(rechercherButton);

    await screen.findByText('Barman / Barmaid (H/F)');
    // Then
    expect(screen.getByText('Barman / Barmaid (H/F)')).toBeInTheDocument();
  });
});
