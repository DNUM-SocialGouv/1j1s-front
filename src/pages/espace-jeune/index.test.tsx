/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import EspaceJeunePage from '~/pages/espace-jeune/index.page';
import { aCartesActualitesListFixture } from '~/server/cms/domain/actualite.fixture';
import { anEspaceJeune } from '~/server/cms/domain/espaceJeune.fixture';

describe('Page Espace Jeune', () => {
  beforeEach(() => {
    mockSmallScreen();
    mockUseRouter({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('À l‘arrivée sur la page', () => {
    it('affiche une liste 6 actualités maximum', () => {
      const carteActualites = aCartesActualitesListFixture();
      const espaceJeune = anEspaceJeune();

      render(<EspaceJeunePage cartesActualites={carteActualites} espaceJeune={espaceJeune} />);
      const actualitesSection = screen.getByTestId('actualites');
      const cartesList = within(actualitesSection).getAllByRole('link');
      const seeMore = within(actualitesSection).getByRole('region');
      const cartesSeeMore = within(seeMore).getAllByRole('link');

      expect(cartesList[6]).toEqual(cartesSeeMore[0]);
    });
  });
});
