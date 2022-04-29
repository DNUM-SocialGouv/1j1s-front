/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import {
  screen,
} from '@testing-library/react';
import { fireEvent, render  } from '@tests/fixtures/client/dependenciesProvider.fixture';

import  Emplois  from '~/pages/emplois';


describe.skip('Emplois', () => {
  it('appelle l\'api emploi au click sur rechercher',  async() => {
    render(<Emplois />);

    const rechercherButton = screen.getByRole('button', {
      name: 'Rechercher',
    });

    fireEvent.submit(rechercherButton);

    const intitulé = 'Barman / Barmaid (H/F)';
    await screen.findByText(intitulé);

    expect(screen.getByText(intitulé)).toBeInTheDocument();
  });
});
