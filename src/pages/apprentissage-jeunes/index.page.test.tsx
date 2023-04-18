/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import * as process from 'process';

import { HeadMock } from '~/client/components/head.mock';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aVideoCampagneApprentissageList } from '~/server/cms/domain/videoCampagneApprentissage.fixture';
import { dependencies } from '~/server/start';

import ApprentissageJeunes, { getServerSideProps } from './index.page';

jest.mock('next/head', () => HeadMock);

jest.mock('~/server/start', () => ({
	dependencies: {
		cmsDependencies: {
			récupérerVidéosCampagneApprentissage: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('Page Apprentissage Jeunes', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	
	describe('getServerSideProps', () => {
		describe('quand le feature flip n‘est pas actif', () => {
			it('renvoie une 404', async () => {
				process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '0';

				const result = await getServerSideProps();

				expect(result).toMatchObject({ notFound: true });
			});
		});
		
		describe('quand le feature flip est actif', () => {
			describe('quand les vidéos ne sont pas récupérées', () => {
				it('renvoie des props vides', async () => {
					process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';
					(dependencies.cmsDependencies.récupérerVidéosCampagneApprentissage.handle as jest.Mock).mockReturnValue({});
					
					const result = await getServerSideProps();
					
					expect(result).toMatchObject({ props: {} });
				});
			});
			
			describe('quand les vidéos sont récupérées', () => {
				it('renvoie les props', async () => {
					process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';
					(dependencies.cmsDependencies.récupérerVidéosCampagneApprentissage.handle as jest.Mock).mockReturnValue(aVideoCampagneApprentissageList());
	
					const result = await getServerSideProps();
			
					expect(result).toMatchObject({ props: {} });
				});
			});
		});
		
	});

	describe('<ApprentissageJeunes />', () => {
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

});
