/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { aCartesMesuresEmployeursList } from '@tests/fixtures/domain/mesuresEmployeurs.fixture';

import { MesuresEmployeursComponent } from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs';

const mesuresEmployeurs = {
  dispositifs: aCartesMesuresEmployeursList(),
};

describe('MesuresEmployeurs', () => {
  beforeEach(() => {
    mockSmallScreen();
  });
  beforeEach(() => {
    mockUseRouter({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('affiche les sections des mesures employeurs', () => {
    render(<MesuresEmployeursComponent mesuresEmployeurs={mesuresEmployeurs}/>);
    const dispositifs = screen.getByText('Découvrir les dispositifs pour vous aider à recruter');
    expect(dispositifs).toBeInTheDocument();
  });

  it('affiches les cartes dispositifs employeurs', () => {
    render(<MesuresEmployeursComponent mesuresEmployeurs={mesuresEmployeurs} />);
    const cartes = screen.getAllByTestId('carteMesuresEmployeurs');
    expect(cartes.length).toEqual(4);
  });
});

