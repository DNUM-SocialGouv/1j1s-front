import { Either } from '~/server/errors/either';

import { MesureEmployeur } from './mesureEmployeur';

export interface MesuresEmployeursRepository {
	getMesuresEmployeurs(): Promise<Either<Array<MesureEmployeur>>>
}
