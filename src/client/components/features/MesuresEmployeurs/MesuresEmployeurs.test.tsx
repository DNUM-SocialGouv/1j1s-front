/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { MesuresEmployeursComponent } from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs';
import { mockUseRouter } from '~/client/useRouter.mock';
import { mockSmallScreen } from '~/client/window.mock';
import { aCartesMesuresEmployeursList } from '~/server/cms/domain/mesuresEmployeurs.fixture';

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

