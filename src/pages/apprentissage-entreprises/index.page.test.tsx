/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render,screen } from '@testing-library/react';
import * as process from 'process';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { aVideoService } from '~/client/services/video/video.service.fixture';
import { aVideoCampagneApprentissageList } from '~/server/cms/domain/videoCampagneApprentissage.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { dependencies } from '~/server/start';

import ApprentissageEntreprises, { getServerSideProps } from './index.page';

jest.mock('~/server/start', () => ({
	dependencies: {
		cmsDependencies: {
			recupererVideosCampagneApprentissage: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('<ApprentissageEntreprises />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockSmallScreen();
		mockUseRouter({ query: { page: '1' } });
		const videos = aVideoCampagneApprentissageList();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
				youtubeService={aVideoService()}
			>
				<ApprentissageEntreprises videos={videos} />);
			</DependenciesProvider>);

		await screen.findByText('5 bonnes raisons de choisir l’apprentissage :');

		await expect(container).toBeAccessible();
	});

	describe('getServerSideProps', () => {

		describe('quand les vidéos ne sont pas récupérées', () => {
			it('renvoie une liste vide pour les vidéos', async () => {
				process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';
				(dependencies.cmsDependencies.recupererVideosCampagneApprentissage.handle as jest.Mock).mockReturnValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

				const result = await getServerSideProps();

				expect(result).toMatchObject({ props: {
					videos: [],
				} });
			});
		});

		describe('quand les vidéos sont récupérées', () => {
			it('renvoie les props', async () => {
				process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';
				(dependencies.cmsDependencies.recupererVideosCampagneApprentissage.handle as jest.Mock).mockReturnValue(createSuccess(aVideoCampagneApprentissageList()));

				const result = await getServerSideProps();

				expect(result).toMatchObject({ props: {
					videos: aVideoCampagneApprentissageList(),
				} });
			});
		});
	});
});
