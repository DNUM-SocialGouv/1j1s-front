import { Either } from '~/server/errors/either';

import { Formation, FormationFiltre } from './formation';

export interface FormationRepository {
	search(filtre: FormationFiltre): Promise<Either<Array<Formation>>>
}
