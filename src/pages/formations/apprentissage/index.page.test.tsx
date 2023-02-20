/**
 * @jest-environment jsdom
 */
import { getServerSideProps } from '~/pages/formations/apprentissage/index.page';

describe('Page Formations en Apprentissage', () => {
	describe('quand le feature flip n‘est pas actif', () => {
		beforeEach(() => {
			process.env = {
				NEXT_PUBLIC_FORMATION_LBA_FEATURE: '0',
			};
		});
		it('retourne une page 404', async () => {
			const value = await getServerSideProps();

			expect(value).toEqual({ notFound: true });
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env = {
				NEXT_PUBLIC_FORMATION_LBA_FEATURE: '1',
			};
		});
		it('retourne les props de la page', async () => {
			const value = await getServerSideProps();

			expect(value).toEqual({ props: {} });
		});
	});
});
