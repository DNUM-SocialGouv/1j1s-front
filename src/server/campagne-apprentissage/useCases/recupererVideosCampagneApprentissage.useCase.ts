import { Either } from '../../errors/either';
import { VideoCampagneApprentissage } from '../domain/videoCampagneApprentissage';
import { VideoCampagneApprentissageRepository } from '../domain/videoCampagneApprentissage.repository';

export class RecupererVideosCampagneApprentissageUseCase {
	constructor(private videoCampagneApprentissageRepository: VideoCampagneApprentissageRepository) {}

	async handle(): Promise<Either<Array<VideoCampagneApprentissage>>> {
		return this.videoCampagneApprentissageRepository.getAllVideosCampagneApprentissage();
	}
}
