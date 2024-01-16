import { VideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage';
import {
	VideoCampagneApprentissageRepository,
} from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage.repository';
import {
	StrapiVideoCampagneApprentissage,
} from '~/server/campagne-apprentissage/infra/strapiVideoCampagneApprentissage';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isFailure, isSuccess } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';

import { mapVideoCampagneApprentissage } from '../../cms/infra/repositories/strapi.mapper';

export class StrapiVideoCampagneApprentissageRepository implements VideoCampagneApprentissageRepository {
	private RESOURCE_VIDEO_CAMPAGNE_APPRENTISSAGE = 'videos-campagne-apprentissages';
	constructor(private strapiService: CmsRepository, private errorManagementService: ErrorManagementService) {}

	async getAllVideosCampagneApprentissage(): Promise<Either<Array<VideoCampagneApprentissage>>> {
		const query = 'sort[0]=Index';
		const strapiVideosCampagne = await this.strapiService.getCollectionType<StrapiVideoCampagneApprentissage[]>(this.RESOURCE_VIDEO_CAMPAGNE_APPRENTISSAGE, query);
		if (isSuccess(strapiVideosCampagne)) {
			return createSuccess(strapiVideosCampagne.result.map((strapiVideo) => this.mapToVideoCampagneApprentissage(strapiVideo)));
		}

		// sinon gérer erreur
	}

	private mapToVideoCampagneApprentissage(strapiVideoCampagneApprentissage: StrapiVideoCampagneApprentissage): VideoCampagneApprentissage {
		const videoIdWithPotentialParams = strapiVideoCampagneApprentissage.Url.split('v=')[1];
		const videoId = videoIdWithPotentialParams.split('&')[0];
		return {
			titre: strapiVideoCampagneApprentissage.Titre,
			transcription: strapiVideoCampagneApprentissage.Transcription,
			videoId: videoId,
		};
	};
}
