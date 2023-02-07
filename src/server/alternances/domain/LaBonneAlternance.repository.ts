import { Alternance, AlternanceQuery } from '~/server/alternances/domain/alternance';
import { MetierAlternance } from '~/server/alternances/domain/métier';

import { Either } from '../../errors/either';

export interface LaBonneAlternanceRepository {
	getMetier(recherche): Promise<Either<Array<MetierAlternance>>>
	search(filtre: AlternanceQuery): Promise<Either<Array<Alternance>>>
}
