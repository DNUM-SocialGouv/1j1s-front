import { render, screen } from '@testing-library/react';

import { MesuresEmployeursComponent } from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aMesureEmployeur, aMesuresEmployeursList } from '~/server/mesures-employeurs/domain/mesureEmployeur.fixture';

describe('MesuresEmployeurs', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	it('affiche les sections des mesures employeurs', () => {
		render(<MesuresEmployeursComponent mesureEmployeurList={aMesuresEmployeursList()} />);
		const dispositifs = screen.getByText(/Je découvre toutes les mesures du plan 1 jeune 1 solution/);
		expect(dispositifs).toBeVisible();
	});

	it('affiches les cartes dispositifs employeurs', () => {
		const mesureEmployeurList = [aMesureEmployeur(), aMesureEmployeur({ titre: 'une seconde mesure employeur' })];
		render(<MesuresEmployeursComponent mesureEmployeurList={mesureEmployeurList} />);

		expect(screen.getAllByRole('listitem').length).toEqual(2);
	});
});

