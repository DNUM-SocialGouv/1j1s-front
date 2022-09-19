/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
} from '@testing-library/react';
import { mockUseRouter } from '@tests/client/useRouter.mock';
import { mockSmallScreen } from '@tests/client/window.mock';

import MentoratPage from '~/pages/mentorat';

describe('MentoratPage', () => {
  beforeEach(() => {
    mockUseRouter({});
    mockSmallScreen();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('possède un h1', () => {
    render(
      <MentoratPage />,
    );

    const headingList = screen.getAllByRole('heading', { level: 1 });
    const heading = headingList[0];

    expect(heading).toHaveTextContent('1 jeune 1 mentor, être accompagné par un mentor pour réussir');
  });

  it('possède un bouton -Je trouve mon mentor- qui redirige l\'utilisateur', () => {
    render(
      <MentoratPage />,
    );
    const linkAsButton = screen.getByRole('link', { name: 'Je trouve mon mentor' });

    expect(linkAsButton).toBeInTheDocument();
    expect(linkAsButton).toHaveAttribute('href', 'https://www.1jeune1mentor.fr/formulaire?1jeune1solution');
  });
});
