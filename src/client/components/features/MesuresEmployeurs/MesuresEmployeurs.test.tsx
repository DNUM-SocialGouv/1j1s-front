/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { MesuresEmployeursComponent } from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aCartesMesuresEmployeursList } from '~/server/cms/domain/mesureEmployeur.fixture';

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
		render(<MesuresEmployeursComponent mesureEmployeurList={aCartesMesuresEmployeursList()}/>);
		const dispositifs = screen.getByText('Découvrir les dispositifs pour vous aider à recruter');
		expect(dispositifs).toBeInTheDocument();
	});

	it('affiches les cartes dispositifs employeurs', () => {
		render(<MesuresEmployeursComponent mesureEmployeurList={aCartesMesuresEmployeursList()}/>);
		const cartes = screen.getAllByTestId('carteMesuresEmployeurs');
		expect(cartes.length).toEqual(4);
	});
});

