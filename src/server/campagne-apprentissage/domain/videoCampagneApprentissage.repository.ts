import { Either } from '~/server/errors/either';

import { VideoCampagneApprentissage } from './videoCampagneApprentissage';

export interface VideoCampagneApprentissageRepository {
	getAllVideosCampagneApprentissage(): Promise<Either<Array<VideoCampagneApprentissage>>>
}
