/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';
import { aMesuresEmployeurs } from '@tests/fixtures/domain/mesuresEmployeurs.fixture';

import { MesuresEmployeursComponent } from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs';

const mesuresEmployeurs = aMesuresEmployeurs();

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
    const cartes = screen.getAllByRole('article');
    expect(cartes.length).toEqual(4);
  });

  it('affiche un lien local pour les articles internes ou externe pour les sites étrangers', () => {
    render(<MesuresEmployeursComponent mesuresEmployeurs={mesuresEmployeurs} />);
    const [ external, internal ] = screen.getAllByRole('link');
    /* eslint-disable testing-library/no-node-access */
    expect(external).toHaveAttribute('href', expect.stringMatching(/^https:\/\//));
    expect(internal).toHaveAttribute('href', '/articles/slug-article');
  });
});

