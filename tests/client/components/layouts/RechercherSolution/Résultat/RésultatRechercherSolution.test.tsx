/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { aBarmanOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';

describe('RésultatRechercherSolution', () => {

  beforeEach(() => {
    mockSmallScreen();
    mockUseRouter({});
  });

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
    const lienVersOffreEmploi = screen.getByRole('link');

    expect(within(étiquettesOffreAlternanceList).queryAllByRole('listitem')).toHaveLength(4);
    expect(lienVersOffreEmploi).toHaveAttribute('href', `/emplois/${offreEmploi.id}`);
  });
});
