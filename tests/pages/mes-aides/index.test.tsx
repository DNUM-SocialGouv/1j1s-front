/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import MesAidesPage from '~/pages/mes-aides';

describe('MesAidesPage', () => {

  it('affiche un titre de niveau 1', () => {
    render(
      <MesAidesPage />,
    );

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent('Je découvre les aides auxquelles j’ai droit en moins de 5 minutes');
  });

  it('permet de rediriger l\'utilisateur vers le smilateur d\'aide', () => {
    render(
      <MesAidesPage />,
    );

    const link = screen.getByRole('link', { name: 'Je commence la simulation' });

    expect(link).toHaveAttribute('href', 'https://mes-aides.1jeune1solution.beta.gouv.fr/simulation/individu/demandeur/date_naissance');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
