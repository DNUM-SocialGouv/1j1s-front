import { VideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage';
import { aVideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage.fixture';
import {
	aStrapiVideoCampagneApprentissage,
} from '~/server/campagne-apprentissage/infra/strapiVideoCampagneApprentissage.fixture';
import {
	StrapiVideoCampagneApprentissageRepository,
} from '~/server/campagne-apprentissage/infra/strapiVideoCampagneApprentissage.repository';
import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess, Success } from '~/server/errors/either';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import {
	anAuthenticatedHttpClientService, anAxiosResponse,
	aPublicHttpClientService,
} from '~/server/services/http/publicHttpClient.service.fixture';

describe('StrapiVideoCampagneApprentissageRepository', () => {
	describe('getAllVideosCampagneApprentissage', () => {
		it('appelle le service strapi avec les bons paramètres', async () => {
			// GIVEN
			const strapiService = aStrapiCmsRepository();
			const strapiVideoCampagneApprentissageRepository = new StrapiVideoCampagneApprentissageRepository(strapiService, anErrorManagementService());
			const strapiVideoResourceName = 'videos-campagne-apprentissages';
			// jest.spyOn(strapiService, 'getCollectionType').mockResolvedValueOnce();

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
				Url: 'https://www.youtube.com/watch?v=V3cxW3ZRV-I',
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
	});
});
