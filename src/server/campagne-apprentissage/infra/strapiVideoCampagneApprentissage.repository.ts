import { VideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage';
import {
	VideoCampagneApprentissageRepository,
} from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage.repository';
import {
	StrapiVideoCampagneApprentissage,
} from '~/server/campagne-apprentissage/infra/strapiVideoCampagneApprentissage';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';

import {
	mapToVideoCampagneApprentissage,
} from './strapiVideoCampagneApprentissage.mapper';

export class StrapiVideoCampagneApprentissageRepository implements VideoCampagneApprentissageRepository {
	private RESOURCE_VIDEO_CAMPAGNE_APPRENTISSAGE = 'videos-campagne-apprentissages';
	constructor(private strapiService: CmsRepository, private errorManagementService: ErrorManagementService) {}

	async getAllVideosCampagneApprentissage(): Promise<Either<Array<VideoCampagneApprentissage>>> {
		const query = 'sort[0]=Index';
		const strapiVideosCampagne = await this.strapiService.getCollectionType<StrapiVideoCampagneApprentissage>(this.RESOURCE_VIDEO_CAMPAGNE_APPRENTISSAGE, query);
		if (isFailure(strapiVideosCampagne)) {
			return strapiVideosCampagne;
		}

		try{
			const videosCampagneApprentissage = strapiVideosCampagne.result.map((strapiVideo) => mapToVideoCampagneApprentissage(strapiVideo));
			return createSuccess(videosCampagneApprentissage);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'Strapi - vidéo campagne apprentissage',
				contexte: 'récupération des vidéos de la campagne d’apprentissage',
				message: 'impossible de mapper correctement une vidéo de la campagne apprentissage',
			});
		}
	}
}
