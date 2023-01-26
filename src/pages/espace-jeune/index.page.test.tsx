/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import EspaceJeunePage from '~/pages/espace-jeune/index.page';
import { aCarteActualiteFixture, aCartesActualitesListFixture } from '~/server/cms/domain/actualite.fixture';
import { anEspaceJeune } from '~/server/cms/domain/espaceJeune.fixture';

describe('Page Espace Jeune', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('Si des actualités sont récupérées', () => {
		it('n‘affiche pas le bouton voir plus si moins de 7 actualités', () => {
			const carteActualites = [aCarteActualiteFixture({ titre: 'Actualité 1' })];
			const espaceJeune = anEspaceJeune();

			render(<EspaceJeunePage cartesActualites={carteActualites} espaceJeune={espaceJeune}/>);
			const actualitesSection = screen.getByTestId('actualites');

			expect(within(actualitesSection).queryByRole('button', { name: 'Voir plus de résultats sur les actualités' })).not.toBeInTheDocument();
		});

		it('affiche pas le bouton voir plus si plus de 6 actualités', () => {
			const carteActualites = aCartesActualitesListFixture();
			const espaceJeune = anEspaceJeune();

			render(<EspaceJeunePage cartesActualites={carteActualites} espaceJeune={espaceJeune}/>);
			const actualitesSection = screen.getByTestId('actualites');

			expect(within(actualitesSection).getByRole('button', { name: 'Voir plus de résultats sur les actualités' })).toBeInTheDocument();
		});
	});
});
