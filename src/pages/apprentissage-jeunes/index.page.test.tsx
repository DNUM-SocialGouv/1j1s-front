/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import * as process from 'process';

import { HeadMock } from '~/client/components/head.mock';
import { mockSmallScreen } from '~/client/components/window.mock';

import ApprentissageJeunes, { getServerSideProps } from './index.page';

jest.mock('next/head', () => HeadMock);

describe('<ApprentissageJeunes />', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renvoie 404 quand la page est feature flippée off', async () => {
		process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '0';

		const result = await getServerSideProps();

		expect(result).toMatchObject({ notFound: true });
	});

	it('renvoie les props quand la page est feature flippée on', async () => {
		process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';

		const result = await getServerSideProps();

		expect(result).toMatchObject({ props: {} });
	});

	it('affiche une section principale avec ancre pour le lien d‘évitement', () => {
		// WHEN
		render(<ApprentissageJeunes />);

		// THEN
		const main = screen.getByRole('main');
		expect(main).toBeVisible();
		expect(main).toHaveAttribute('id', 'contenu');
	});

	it('affiche la bonne page', () => {
		render(<ApprentissageJeunes/>);

		const titrePage = screen.getByRole('heading', { level: 1, name: /L’apprentissage : pour moi c’est le bon choix/i });

		expect(titrePage).toBeVisible();
	});

	it('affiche le titre du document', () => {
		render(<ApprentissageJeunes/> );

		const titre = document.title;

		expect(titre).toEqual('Découvrir et trouver sa voie avec l’apprentissage | 1jeune1solution');
	});
});
