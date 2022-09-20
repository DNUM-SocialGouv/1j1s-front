/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { aMesuresJeunes } from '@tests/fixtures/domain/mesuresJeunes.fixture';

import { MesuresJeunesComponent } from '~/client/components/features/MesuresJeunes/MesuresJeunes';

const mesuresJeunes = aMesuresJeunes();

describe('MesuresJeunes', () => {
  beforeEach(() => {
    mockUseRouter({});
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('affiche les sections des mesures jeunes', () => {
    render(<MesuresJeunesComponent mesuresJeunes={mesuresJeunes}/>);
    const vieProfessionnelle = screen.getByText('Entrée dans la vie professionnelle');
    const orienterFormer = screen.getByText('S\'orienter et se former');
    const parcoursAccompagnement = screen.getByText('Parcours d\'accompagnement');
    const aidesFinancières = screen.getByText('Aides financières');
    [vieProfessionnelle, orienterFormer, parcoursAccompagnement, aidesFinancières].map((section) => {
      expect(section).toBeInTheDocument();
    });
  });

  it('affiches les cartes mesuresJeunes', () => {
    render(<MesuresJeunesComponent mesuresJeunes={mesuresJeunes} />);
    const cartes = screen.getAllByRole('article');
    expect(cartes.length).toEqual(16);
  });
});
