/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import EspaceJeunePage from '~/pages/espace-jeune/index.page';
import { CarteActualite } from '~/server/cms/domain/actualite';
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
		it('affiche une liste 6 actualités maximum', () => {
			const carteActualites = aCartesActualitesListFixture();
			const espaceJeune = anEspaceJeune();

			render(<EspaceJeunePage cartesActualites={carteActualites} espaceJeune={espaceJeune}/>);
			const actualitesSection = screen.getByTestId('actualites');
			const cartesList = within(actualitesSection).getAllByRole('link');
			const seeMore = within(actualitesSection).getByRole('region');
			const cartesSeeMore = within(seeMore).getAllByRole('link');

			expect(cartesList[6]).toEqual(cartesSeeMore[0]);
		});

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

	describe('Si aucune actualité n‘est récupérée', () => {
		it('n‘affiche pas la section des actualités', () => {
			const carteActualites: CarteActualite[] = [];
			const espaceJeune = anEspaceJeune();

			render(<EspaceJeunePage cartesActualites={carteActualites} espaceJeune={espaceJeune}/>);
			const actualitesSection = screen.queryByTestId('actualites');

			expect(actualitesSection).not.toBeInTheDocument();
		});
	});
	it('affiche une liste de 9 mesures jeunes', () => {
		const carteActualites = aCartesActualitesListFixture();
		const espaceJeune = anEspaceJeune();

		render(<EspaceJeunePage cartesActualites={carteActualites} espaceJeune={espaceJeune}/>);
		const mesuresJeunesSection = screen.getByTestId('espace-jeune');
		const cartesList = within(mesuresJeunesSection).getAllByRole('link');
		const seeMore = within(mesuresJeunesSection).getByRole('region');
		const cartesSeeMore = within(seeMore).getAllByRole('link');

		expect(cartesList[9]).toEqual(cartesSeeMore[0]);
	});
});
