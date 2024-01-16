import { Either } from '../../errors/either';
import { VideoCampagneApprentissage } from './videoCampagneApprentissage';

export interface VideoCampagneApprentissageRepository {
	getAllVideosCampagneApprentissage(): Promise<Either<Array<VideoCampagneApprentissage>>>
}
