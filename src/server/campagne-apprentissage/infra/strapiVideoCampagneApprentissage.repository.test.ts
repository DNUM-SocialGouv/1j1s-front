import { VideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage';
import { aVideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage.fixture';
import {
	aStrapiVideoCampagneApprentissage,
} from '~/server/campagne-apprentissage/infra/strapiVideoCampagneApprentissage.fixture';
import {
	StrapiVideoCampagneApprentissageRepository,
} from '~/server/campagne-apprentissage/infra/strapiVideoCampagneApprentissage.repository';
import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';

describe('StrapiVideoCampagneApprentissageRepository', () => {
	describe('getAllVideosCampagneApprentissage', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			// GIVEN
			const strapiService = aStrapiCmsRepository();
			const strapiVideoCampagneApprentissageRepository = new StrapiVideoCampagneApprentissageRepository(strapiService, anErrorManagementService());
			const strapiVideoResourceName = 'videos-campagne-apprentissages';

			// WHEN
			await strapiVideoCampagneApprentissageRepository.getAllVideosCampagneApprentissage();

			// THEN
			expect(strapiService.getCollectionType).toHaveBeenCalledWith(strapiVideoResourceName, 'sort[0]=Index');
		});

		it('retourne les vidéos de la campagne apprentissage', async () => {
			// GIVEN
			const strapiService = aStrapiCmsRepository();
			const strapiVideoCampagneApprentissageRepository = new StrapiVideoCampagneApprentissageRepository(strapiService, anErrorManagementService());
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess([aStrapiVideoCampagneApprentissage({
				Titre: "Contrat d'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…",
				Transcription: '[transcription]',
				Url: 'https://www.youtube.com/watch?v=V3cxW3ZRV-I&additionnalParams=true',
			})]));

			// WHEN
			const result = await strapiVideoCampagneApprentissageRepository.getAllVideosCampagneApprentissage();

			// THEN
			expect(result.instance).toBe('success');
			expect((result as Success<Array<VideoCampagneApprentissage>>).result).toStrictEqual([aVideoCampagneApprentissage(
				{
					titre: "Contrat d'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…",
					transcription: '[transcription]',
					videoId: 'V3cxW3ZRV-I',
				}),
			]);
		});

		it('quand strapi service est en erreur, relaie l’erreur', async () => {
			// GIVEN
			const strapiService = aStrapiCmsRepository();
			const strapiVideoCampagneApprentissageRepository = new StrapiVideoCampagneApprentissageRepository(strapiService, anErrorManagementService());
			const strapiServiceError = ErreurMetier.SERVICE_INDISPONIBLE;
			jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createFailure(strapiServiceError));

			// WHEN
			const result = await strapiVideoCampagneApprentissageRepository.getAllVideosCampagneApprentissage();

			// THEN
			expect(result.instance).toBe('failure');
			expect((result as Failure).errorType).toStrictEqual(strapiServiceError);
		});

		describe('quand le mapping vers une vidéo campagne apprentissage est en erreur', () => {
			it('appelle le service error management pour avec les bons paramètres', async () => {
				// GIVEN
				const strapiService = aStrapiCmsRepository();
				const errorManagementService = anErrorManagementService();
				const strapiVideoCampagneApprentissageRepository = new StrapiVideoCampagneApprentissageRepository(strapiService, errorManagementService);
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess([aStrapiVideoCampagneApprentissage({
					Url: undefined,
				})]));

				// WHEN
				await strapiVideoCampagneApprentissageRepository.getAllVideosCampagneApprentissage();

				// THEN
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(expect.any(Error), aLogInformation({
					apiSource: 'Strapi - vidéo campagne apprentissage',
					contexte: 'récupération des vidéos de la campagne d’apprentissage',
					message: 'impossible de mapper correctement une vidéo de la campagne apprentissage',
				}));
			});

			it('relaie l’erreur de l’error management service', async () => {
				// GIVEN
				const strapiService = aStrapiCmsRepository();
				const errorManagementService = anErrorManagementService();
				const strapiVideoCampagneApprentissageRepository = new StrapiVideoCampagneApprentissageRepository(strapiService, errorManagementService);
				jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce(createSuccess([aStrapiVideoCampagneApprentissage({
					Url: undefined,
				})]));
				const failureFromErrorManagement = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(failureFromErrorManagement);

				// WHEN
				const result = await strapiVideoCampagneApprentissageRepository.getAllVideosCampagneApprentissage();

				// THEN
				expect(result).toStrictEqual(failureFromErrorManagement);
			});
		});
	});
});
