import { Either } from '~/server/errors/either';

import { Métier } from './métier';

export interface MétierRepository {
	getMetierList(recherche: string): Promise<Either<Array<Métier>>>
}
