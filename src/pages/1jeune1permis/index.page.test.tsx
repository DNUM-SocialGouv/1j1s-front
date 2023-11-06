/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { HeadMock } from '~/client/components/head.mock';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';

import UnJeuneUnPermis, {getServerSideProps} from './index.page';

jest.mock('next/head', () => HeadMock);

describe('1jeune1permis', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	describe('quand la feature est désactivé', () => {
		it('retourne une page 404', async () => {
			process.env.NEXT_PUBLIC_1JEUNE1PERMIS = '0';

			const result = await getServerSideProps();
			expect(result).toMatchObject({ notFound: true });
		});
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(<UnJeuneUnPermis />);

		await expect(container).toBeAccessible();
	});

	it('n\'a aucun heading', () => {
		// When
		render(<UnJeuneUnPermis />);

		// Then
		const headings = screen.queryAllByRole('heading');
		expect(headings).toEqual([]);
	});

	it('a le titre de page 1jeune1permis', () => {
		// When
		render(<UnJeuneUnPermis />);

		// Then
		expect(document.title).toContain('1jeune1permis');
	});

	it('affiche l\'iframe 1jeune1permis issue du site mes aides de Pôle emploi', () => {
		// When
		render(<UnJeuneUnPermis />);

		// Then
		const iframe = screen.getByTitle('Informations sur le dispositif 1 jeune 1 permis');
		expect(iframe).toBeVisible();
		expect(iframe).toHaveAttribute('src', 'https://mes-aides.pole-emploi.fr/export/1-jeune-1-permis');
	});
});
