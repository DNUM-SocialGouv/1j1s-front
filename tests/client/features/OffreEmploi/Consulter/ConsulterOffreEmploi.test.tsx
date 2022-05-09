/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { aMaçonOffreEmploi, aValetOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { ConsulterOffreEmploi } from '~/client/components/features/OffreEmploi/Consulter/ConsulterOffreEmploi';

jest.mock('dompurify', () => {
  return {
    sanitize: jest.fn().mockImplementation(() => 'sanitized'),
  };
});

describe('ConsulterOffreEmploi', () => {
  it('affiche l\'offre d\'emploi', () => {
    const offreEmploi = aMaçonOffreEmploi();

    render(<ConsulterOffreEmploi offreEmploi={offreEmploi} />);

    const nomEntreprise = screen.getByText('RAS 1040');
    const intituléOffreEmploi = screen.getByText('Maçon / Maçonne');
    const étiquettesOffreEmploiList = screen.getByTestId('ÉtiquetteOffreEmploiList');


    expect(nomEntreprise).toBeInTheDocument();
    expect(intituléOffreEmploi).toBeInTheDocument();
    expect(within(étiquettesOffreEmploiList).queryAllByRole('listitem')).toHaveLength(3);
  });

  it('permet de postuler à l\'offre d\'emploi', () => {
    const offreEmploi = aValetOffreEmploi();

    render(<ConsulterOffreEmploi offreEmploi={offreEmploi} />);

    const linkPostulerOffreEmploi = screen.getByTestId('LinkPostulerOffreEmploi');

    expect(linkPostulerOffreEmploi).toHaveAttribute('href', offreEmploi.urlOffreOrigine);
    expect(linkPostulerOffreEmploi).toHaveAttribute('target', '_blank');
  });
});
