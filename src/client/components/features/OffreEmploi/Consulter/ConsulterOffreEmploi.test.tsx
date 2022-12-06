/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { ConsulterOffreEmploi } from '~/client/components/features/OffreEmploi/Consulter/ConsulterOffreEmploi';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { aBarmanOffre, aMaçonOffre, aValetOffre } from '~/server/offres/domain/offre.fixture';

jest.mock('dompurify', () => {
  return {
    sanitize: jest.fn().mockImplementation(() => 'sanitized'),
  };
});

describe('ConsulterOffreEmploi', () => {
  beforeEach(() => {
    mockUseRouter({});
  });

  it('affiche l\'offre d\'emploi', () => {
    const offreEmploi = aMaçonOffre();

    render(<ConsulterOffreEmploi offreEmploi={offreEmploi} />);

    const nomEntreprise = screen.getByText('RAS 1040');
    const intituléOffreEmploi = screen.getByText('Maçon / Maçonne');
    const étiquettesOffreEmploiList = screen.getByRole('list', { name: 'Caractéristiques de l\'offre d\'emploi' });


    expect(nomEntreprise).toBeInTheDocument();
    expect(intituléOffreEmploi).toBeInTheDocument();
    expect(within(étiquettesOffreEmploiList).queryAllByRole('listitem')).toHaveLength(3);
  });

  it('permet de postuler à l\'offre d\'emploi', () => {
    const offreEmploi = aValetOffre();

    render(<ConsulterOffreEmploi offreEmploi={offreEmploi} />);

    const linkPostulerOffreEmploi = screen.getByRole('link', { name: 'Je postule sur Pôle Emploi' });

    expect(linkPostulerOffreEmploi).toHaveAttribute('href', offreEmploi.urlOffreOrigine);
    expect(linkPostulerOffreEmploi).toHaveAttribute('target', '_blank');
  });

  it('affiche la formation requise dans un paragraphe', () => {
    const offreEmploi = aMaçonOffre();

    render(<ConsulterOffreEmploi offreEmploi={offreEmploi} />);

    const formationParagraph = screen.getByTestId('FormationParagraph');
    const formationList = screen.queryByTestId('FormationList');

    expect(formationList).not.toBeInTheDocument();
    expect(formationParagraph).toBeInTheDocument();
  });

  it('affiche les formations requises dans une liste', () => {
    const offreEmploi = aBarmanOffre();

    render(<ConsulterOffreEmploi offreEmploi={offreEmploi} />);

    const formationParagraph = screen.queryByTestId('FormationParagraph');
    const formationList = screen.getByTestId('FormationList');

    expect(formationParagraph).not.toBeInTheDocument();
    expect(formationList).toBeInTheDocument();
  });
});
