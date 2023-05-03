import * as process from 'process';

import { aVideoCampagneApprentissageList } from '~/server/cms/domain/videoCampagneApprentissage.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { dependencies } from '~/server/start';

import { getServerSideProps } from './index.page';

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

	describe('getServerSideProps', () => {
		describe('quand le feature flip n‘est pas actif', () => {
			it('renvoie 404 quand la page est feature flippé off', async () => {
				process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '0';

				const result = await getServerSideProps();

				expect(result).toMatchObject({ notFound: true });
			});
		});

		describe('quand le feature flip est actif', () => {
			describe('quand les vidéos ne sont pas récupérées', () => {
				it('renvoie une liste vide pour les vidéos', async () => {
					process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';
					(dependencies.cmsDependencies.recupererVideosCampagneApprentissage.handle as jest.Mock).mockReturnValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));

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
});
