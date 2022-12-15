/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import ImmersionReferenceMonEntreprisePage from '~/pages/immersions/referencer-mon-entreprise/index.page';

describe('Immersion / Référencer mon entreprise', () => {
  beforeEach(() => {
    mockSmallScreen();
  });
  
  it('affiche un formulaire de référencement des entreprises dans une iframe', () => {
    render(<ImmersionReferenceMonEntreprisePage />);

    const iframe = screen.getByTitle('Formulaire recueil des entreprises volontaires pour l‘accueil des immersions professionnelles');
    
    expect(iframe).toBeInTheDocument();
  });

  it('propose des liens vers les conditions générales d‘utilisation et la politique de confidentialité', () => {
    render(<ImmersionReferenceMonEntreprisePage />);

    const lienConditionsGénéralesUtilisation = screen.getByRole('link', { name: 'Conditions Générales d‘Utilisation' });
    const lienPolitiqueConfidentialité = screen.getByRole('link', { name: 'Politique de Confidentialité' });

    expect(lienConditionsGénéralesUtilisation).toBeInTheDocument();
    expect(lienPolitiqueConfidentialité).toBeInTheDocument();
  });
});
