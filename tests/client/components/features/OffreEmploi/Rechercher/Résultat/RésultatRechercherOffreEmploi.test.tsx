/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import { aBarmanOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';

import { RésultatRechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/Résultat/RésultatRechercherOffreEmploi';

describe('RésultatRechercherOffreEmploi', () => {
  it('affiche une carte avec un résumé de l\'offre d\'emploi', () => {
    const offreEmploi = aBarmanOffreEmploi();

    render(<RésultatRechercherOffreEmploi offreEmploi={offreEmploi} />);

    const étiquettesOffreEmploiList = screen.getByTestId('ÉtiquetteOffreEmploiList');
    const lienVersOffreEmploi = screen.getByTestId('RésultatRechercherOffreEmploi');

    expect(within(étiquettesOffreEmploiList).queryAllByRole('listitem')).toHaveLength(4);
    expect(lienVersOffreEmploi).toHaveAttribute('href', `/emplois/${offreEmploi.id}`);
  });
});
