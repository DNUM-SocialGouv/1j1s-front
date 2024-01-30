/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { HeadMock } from '~/client/components/head.mock';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { ManualAnalyticsService } from '~/client/services/analytics/analytics.service';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aVideoService } from '~/client/services/video/video.service.fixture';
import { aVideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { dependencies } from '~/server/start';

import ApprentissageJeunes, { getServerSideProps } from './index.page';

jest.mock('next/head', () => HeadMock);

jest.mock('~/server/start', () => ({
	dependencies: {
		campagneApprentissageDependencies: {
			recupererVideosCampagneApprentissageUseCase: {
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
		analyticsService = aManualAnalyticsService();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getServerSideProps', () => {
		describe('quand les vidéos ne sont pas récupérées', () => {
			it('renvoie une liste vide pour les vidéos', async () => {
				(dependencies.campagneApprentissageDependencies.recupererVideosCampagneApprentissageUseCase.handle as jest.Mock).mockReturnValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				const result = await getServerSideProps();

				expect(result).toMatchObject({ props: {
					videos: [],
				} });
			});
		});

		describe('quand les vidéos sont récupérées', () => {
			it('renvoie les props', async () => {
				const videos = [
					aVideoCampagneApprentissage(),
					aVideoCampagneApprentissage({
						titre: "Qu'est-ce que le Contrat d'Engagement Jeune CEJ ?",
						transcription: '[transcription]',
						videoId: '7zD4PCOiUvw',
					}),
				];
				(dependencies.campagneApprentissageDependencies.recupererVideosCampagneApprentissageUseCase.handle as jest.Mock).mockReturnValue(createSuccess(videos));

				const result = await getServerSideProps();

				expect(result).toMatchObject({ props: {
					videos: videos,
				} });
			});
		});
	});

	describe('<ApprentissageJeunes />', () => {
		it('doit rendre du HTML respectant la specification', async () => {
			mockSmallScreen();
			const videos = [
				aVideoCampagneApprentissage(),
				aVideoCampagneApprentissage({
					titre: "Qu'est-ce que le Contrat d'Engagement Jeune CEJ ?",
					transcription: '[transcription]',
					videoId: '7zD4PCOiUvw',
				}),
			];

			const { container } = render(
				<DependenciesProvider analyticsService={aManualAnalyticsService()} youtubeService={aVideoService()}>
					<ApprentissageJeunes videos={videos}/>
				</DependenciesProvider> );

			await screen.findByText('Avec l’apprentissage, vous apprenez directement');

			expect(container.outerHTML).toHTMLValidate();
		});

		it('n‘a pas de défaut d‘accessibilité', async () => {
			mockSmallScreen();
			const videos = [
				aVideoCampagneApprentissage(),
				aVideoCampagneApprentissage({
					titre: "Qu'est-ce que le Contrat d'Engagement Jeune CEJ ?",
					transcription: '[transcription]',
					videoId: '7zD4PCOiUvw',
				}),
			];

			const { container } = render(
				<DependenciesProvider
					analyticsService={analyticsService}
					youtubeService={aVideoService()}
				>
					<ApprentissageJeunes videos={videos}/>
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
