/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { MesuresEmployeursComponent } from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aMesuresEmployeursList } from '~/server/mesures-employeurs/domain/mesureEmployeur.fixture';

describe('MesuresEmployeurs', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	beforeEach(() => {
		mockUseRouter({});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('affiche les sections des mesures employeurs', () => {
		render(<MesuresEmployeursComponent mesureEmployeurList={aMesuresEmployeursList()}/>);
		const dispositifs = screen.getByText(/Je découvre toutes les mesures du plan 1 jeune 1 solution/);
		expect(dispositifs).toBeVisible();
	});

	it('affiches les cartes dispositifs employeurs', () => {
		render(<MesuresEmployeursComponent mesureEmployeurList={aMesuresEmployeursList()}/>);
		const cartes = screen.getAllByTestId('carteMesuresEmployeurs');
		expect(cartes.length).toEqual(4);
	});
});

