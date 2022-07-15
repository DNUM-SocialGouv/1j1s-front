/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { anApprentiBoucherOffreFromPoleEmploi } from '@tests/fixtures/domain/alternance.fixture';
import { aBarmanOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';

describe('RésultatRechercherSolution', () => {
  it('affiche une carte emploi avec un résumé de l\'offre', () => {
    const offreEmploi = aBarmanOffreEmploi();
    const defaultLogo = '/images/logos/pole-emploi.svg';

    render(
      <RésultatRechercherSolution
        intituléOffre={offreEmploi.intitulé}
        lienOffre={`/emplois/${offreEmploi.id}`}
        descriptionOffre={offreEmploi.description}
        logoEntreprise={offreEmploi.entreprise.logo || defaultLogo}
        nomEntreprise={offreEmploi.entreprise.nom}
        étiquetteOffreList={offreEmploi.étiquetteList}
      />,
    );

    const étiquettesOffreAlternanceList = screen.getByRole('list', { name: 'Caractéristiques de l\'offre' });
    const lienVersOffreEmploi = screen.getByTestId('RésultatRechercherSolution');

    expect(within(étiquettesOffreAlternanceList).queryAllByRole('listitem')).toHaveLength(4);
    expect(lienVersOffreEmploi).toHaveAttribute('href', `/emplois/${offreEmploi.id}`);
  });

  it('affiche une carte alternance avec un résumé de l\'offre', () => {
    const offreAlternance = anApprentiBoucherOffreFromPoleEmploi();
    const defaultLogo = '/images/logos/pole-emploi.svg';

    render(
      <RésultatRechercherSolution
        intituléOffre={offreAlternance.intitulé}
        lienOffre={`/apprentissage/${offreAlternance.from}-${offreAlternance.id}`}
        descriptionOffre={offreAlternance.description}
        logoEntreprise={offreAlternance.entreprise?.logo || defaultLogo}
        nomEntreprise={offreAlternance.entreprise?.nom}
        étiquetteOffreList={offreAlternance.étiquetteList}
      />,
    );

    const étiquettesOffreAlternanceList = screen.getByRole('list', { name: 'Caractéristiques de l\'offre' });
    const lienVersOffreAlternance = screen.getByTestId('RésultatRechercherSolution');

    expect(within(étiquettesOffreAlternanceList).queryAllByRole('listitem')).toHaveLength(3);
    expect(lienVersOffreAlternance).toHaveAttribute('href', `/apprentissage/${offreAlternance.from}-${offreAlternance.id}`);
  });
});
