import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';
import { Either } from '~/server/errors/either';

export class RecupererVideosCampagneApprentissageUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(): Promise<Either<Array<VideoCampagneApprentissage>>> {
		return this.cmsRepository.getAllVideosCampagneApprentissage();
	}
}
