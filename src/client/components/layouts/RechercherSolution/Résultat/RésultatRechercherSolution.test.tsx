/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
  RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aBarmanOffre } from '~/server/offres/domain/offre.fixture';

describe('RésultatRechercherSolution', () => {

  beforeEach(() => {
    mockSmallScreen();
    mockUseRouter({});
  });

  it('affiche une carte emploi avec un résumé de l\'offre', () => {
    const offreEmploi = aBarmanOffre();
    const defaultLogo = '/images/logos/pole-emploi.svg';

    render(
      <RésultatRechercherSolution
        intituléOffre={offreEmploi.intitulé}
        lienOffre={`/emplois/${offreEmploi.id}`}
        logoEntreprise={offreEmploi.entreprise.logo || defaultLogo}
        nomEntreprise={offreEmploi.entreprise.nom}
        étiquetteOffreList={offreEmploi.étiquetteList}
      />,
    );

    const étiquettesOffreAlternanceList = screen.getByRole('list', { name: 'Caractéristiques de l\'offre' });
    const lienVersOffreEmploi = screen.getByRole('link');
    const intituléOffreEmploi = screen.getByRole('heading', { level: 3 });

    expect(within(étiquettesOffreAlternanceList).queryAllByRole('listitem')).toHaveLength(4);
    expect(lienVersOffreEmploi).toHaveAttribute('href', `/emplois/${offreEmploi.id}`);
    expect(intituléOffreEmploi.textContent).toEqual(offreEmploi.intitulé);
  });
});
