/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';

import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreDeStage';
import { OffreDeStageDétail } from '~/client/components/features/OffreDeStage/OffreDeStage.type';

describe('ConsulterOffreDeStage', () => {
  const offreDeStage: OffreDeStageDétail = {
    createdAt: '',
    dateDeDebut: '2022-09-01',
    description: 'stage en graphisme description',
    duree: '6 mois',
    dureeEnJour: 180,
    dureeEnJourMax: 180,
    employeur: {
      description: '',
      id: '12',
      logoUrl: '',
      nom: 'Gras Fisme',
      siteUrl: '',
    },
    id: '1111',
    localisation: {
      codePostal: '75001',
      departement: '75',
      pays: 'FR',
      region: 'IDF',
      ville: 'Paris',
    },
    publishedAt: '',
    remunerationBase: 1500,
    slug: 'stage-en-graphisme',
    sourceCreatedAt: '',
    sourcePublishedAt: '',
    sourceUpdatedAt: '',
    teletravailPossible: true,
    titre: 'stage en graphisme',
    updatedAt: '',
    urlDeCandidature: 'http://candidature',
  };

  beforeEach(() => {
    mockUseRouter({});
  });

  it('affiche l\'offre de stage', () => {
    render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

    const nomEntreprise = screen.getByText('Gras Fisme');
    const intituléOffreDeStage = screen.getByText('stage en graphisme');

    expect(nomEntreprise).toBeInTheDocument();
    expect(intituléOffreDeStage).toBeInTheDocument();
  });

  it('permet de postuler à l\'offre de stage', () => {
    render(<ConsulterOffreDeStage offreDeStage={offreDeStage}/>);

    const linkPostulerOffreEmploi = screen.getByRole('link', { name: 'Postuler' });

    expect(linkPostulerOffreEmploi).toHaveAttribute('href', offreDeStage.urlDeCandidature);
    expect(linkPostulerOffreEmploi).toHaveAttribute('target', '_blank');
  });
});
