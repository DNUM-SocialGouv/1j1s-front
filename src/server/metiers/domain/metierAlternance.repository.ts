import { Either } from '~/server/errors/either';

import { MetierAlternance } from './metierAlternance';

export interface MétierRepository {
	getMetierList(recherche: string): Promise<Either<Array<MetierAlternance>>>
}
