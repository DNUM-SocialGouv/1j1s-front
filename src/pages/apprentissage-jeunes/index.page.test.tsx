/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import * as process from 'process';

import { HeadMock } from '~/client/components/head.mock';

import ApprentissageJeunes, { getServerSideProps } from './index.page';

jest.mock('next/head', () => HeadMock);

describe('<ApprentissageJeunes />', () => {
	it('renvoie 404 quand la page est feature flippé off', async () => {
		process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '0';

		const result = await getServerSideProps();

		expect(result).toMatchObject({ notFound: true });
	});

	it('renvoie les props quand la page est feature flippé on', async () => {
		process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';

		const result = await getServerSideProps();

		expect(result).toMatchObject({ props: {} });
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
