import { Either } from '~/server/errors/either';

import { Metier } from './metier';

export interface MétierRepository {
	getMetierList(recherche: string): Promise<Either<Array<Metier>>>
}
