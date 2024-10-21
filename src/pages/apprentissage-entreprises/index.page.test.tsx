/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aMarketingService } from '~/client/services/marketing/marketing.service.fixture';
import { aVideoService } from '~/client/services/video/video.service.fixture';
import { aVideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { dependencies } from '~/server/start';

import ApprentissageEntreprises, { getServerSideProps } from './index.page';

jest.mock('~/server/start', () => ({
	dependencies: {
		campagneApprentissageDependencies: {
			recupererVideosCampagneApprentissageUseCase: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('<ApprentissageEntreprises />', () => {
	beforeEach(() => {
	  jest.clearAllMocks();
	});

	it('doit rendre du HTML respectant la specification', () => {
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
				marketingService={aMarketingService()}
				seedtagService={aMarketingService()}
				azerionService={aMarketingService()}
				analyticsService={aManualAnalyticsService()}
				youtubeService={aVideoService()}>
				<ApprentissageEntreprises videos={videos} />
			</DependenciesProvider> );

		expect(container.outerHTML).toHTMLValidate();
	});

	it('n’a pas de défaut d‘accessibilité', async () => {
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
				marketingService={aMarketingService()}
				seedtagService={aMarketingService()}
				azerionService={aMarketingService()}
				analyticsService={aManualAnalyticsService()}
				youtubeService={aVideoService()}>
				<ApprentissageEntreprises videos={videos} />);
			</DependenciesProvider>);

		await screen.findByText('5 bonnes raisons de choisir l’apprentissage :');

		await expect(container).toBeAccessible();
	});

	describe('getServerSideProps', () => {

		describe('Avant la campagne du 22 octobre 2024 sur l’apprentissage', () => {
			beforeEach(() => {
				// Given
				process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '0';
			});
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
		describe('Pendant et après la campagne du 22 octobre 2024 sur l’apprentissage', () => {
			beforeEach(() => {
				// Given
				process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';
			});
			it('ne renvoie pas de vidéos et ne requête pas le service', async () => {
				// When
				const result = await getServerSideProps();

				// Then
				expect(dependencies.campagneApprentissageDependencies.recupererVideosCampagneApprentissageUseCase.handle).not.toHaveBeenCalled();
				expect(result).toMatchObject({ props: {
					videos: null,
				} });
			});
		});
	});
});
