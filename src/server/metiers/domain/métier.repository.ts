import { Either } from '~/server/errors/either';

import { MetierLba } from './metier';

export interface MétierRepository {
	getMetierList(recherche: string): Promise<Either<Array<MetierLba>>>
}
