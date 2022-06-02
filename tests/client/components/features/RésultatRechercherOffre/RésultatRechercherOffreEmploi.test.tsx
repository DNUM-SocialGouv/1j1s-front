/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { aBarmanOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { RésultatRechercherOffre } from '~/client/components/features/RésultatRechercherOffre/RésultatRechercherOffre';

describe('RésultatRechercherOffre', () => {
  it('affiche une carte avec un résumé de l\'offre', () => {
    const offreEmploi = aBarmanOffreEmploi();
    const defaultLogo = '/images/pole-emploi.svg';

    render(
      <RésultatRechercherOffre
        intituléOffre={offreEmploi.intitulé}
        lienOffre={`/emplois/${offreEmploi.id}`}
        descriptionOffre={offreEmploi.description}
        logoEntreprise={offreEmploi.entreprise.logo || defaultLogo}
        nomEntreprise={offreEmploi.entreprise.nom}
        étiquetteOffreList={[
          offreEmploi.lieuTravail,
          offreEmploi.expérience,
          offreEmploi.typeContrat?.libelléCourt,
          offreEmploi.duréeTravail,
        ]}
      />,
    );

    const étiquettesOffreEmploiList = screen.getByTestId('ÉtiquetteOffreList');
    const lienVersOffreEmploi = screen.getByTestId('RésultatRechercherOffre');

    expect(within(étiquettesOffreEmploiList).queryAllByRole('listitem')).toHaveLength(4);
    expect(lienVersOffreEmploi).toHaveAttribute('href', `/emplois/${offreEmploi.id}`);
  });
});
