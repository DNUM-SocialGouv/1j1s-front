/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { HeadMock } from '~/client/components/head.mock';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { ManualAnalyticsService } from '~/client/services/analytics/manualAnalyticsService';
import { aVideoService } from '~/client/services/video/video.service.fixture';
import { aVideoCampagneApprentissageList } from '~/server/cms/domain/videoCampagneApprentissage.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { dependencies } from '~/server/start';

import ApprentissageJeunes, { getServerSideProps } from './index.page';

jest.mock('next/head', () => HeadMock);

jest.mock('~/server/start', () => ({
	dependencies: {
		cmsDependencies: {
			recupererVideosCampagneApprentissage: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('Page Apprentissage Jeunes', () => {
	let analyticsService: ManualAnalyticsService;
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
		analyticsService = anAnalyticsService();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getServerSideProps', () => {
		describe('quand les vidéos ne sont pas récupérées', () => {
			it('renvoie une liste vide pour les vidéos', async () => {
				(dependencies.cmsDependencies.recupererVideosCampagneApprentissage.handle as jest.Mock).mockReturnValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				const result = await getServerSideProps();

				expect(result).toMatchObject({ props: {
					videos: [],
				} });
			});
		});

		describe('quand les vidéos sont récupérées', () => {
			it('renvoie les props', async () => {
				(dependencies.cmsDependencies.recupererVideosCampagneApprentissage.handle as jest.Mock).mockReturnValue(createSuccess(aVideoCampagneApprentissageList()));

				const result = await getServerSideProps();

				expect(result).toMatchObject({ props: {
					videos: aVideoCampagneApprentissageList(),
				} });
			});
		});
	});

	describe('<ApprentissageJeunes />', () => {
		it('n‘a pas de défaut d‘accessibilité', async () => {
			mockSmallScreen();

			const { container } = render(
				<DependenciesProvider
					analyticsService={analyticsService}
					youtubeService={aVideoService()}
				>
					<ApprentissageJeunes videos={aVideoCampagneApprentissageList()}/>
				</DependenciesProvider>,
			);

			await screen.findByText('Avec l’apprentissage, vous apprenez directement');

			await expect(container).toBeAccessible();
		});

		it('affiche une section principale avec ancre pour le lien d‘évitement', () => {
		// WHEN
			render(
				<DependenciesProvider analyticsService={analyticsService}>
					<ApprentissageJeunes videos={[]}/>
				</DependenciesProvider>,
			);

			// THEN
			const main = screen.getByRole('main');
			expect(main).toBeVisible();
			expect(main).toHaveAttribute('id', 'contenu');
		});

		it('affiche la bonne page', () => {
			render(
				<DependenciesProvider analyticsService={analyticsService}>
					<ApprentissageJeunes videos={[]}/>
				</DependenciesProvider>,
			);

			const titrePage = screen.getByRole('heading', { level: 1, name: /Avec l’apprentissage, vous apprenez directement sur le terrain et vous êtes payés !/i });

			expect(titrePage).toBeVisible();
		});

		it('affiche le titre du document', () => {
			render(
				<DependenciesProvider analyticsService={analyticsService}>
					<ApprentissageJeunes videos={[]}/>
				</DependenciesProvider>,
			);

			const titre = document.title;

			expect(titre).toEqual('Découvrir et trouver sa voie avec l’apprentissage | 1jeune1solution');
		});

	});

});
