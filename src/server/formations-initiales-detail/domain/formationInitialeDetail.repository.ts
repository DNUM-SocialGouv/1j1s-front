import { Either } from '~/server/errors/either';

import { FormationInitialeDetailCMS } from './formationInitiale.type';

export interface FormationInitialeDetailRepository {
	getFormationInitialeById(identifiant: string): Promise<Either<FormationInitialeDetailCMS>>
}
