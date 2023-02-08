import { Alternance } from '~/server/alternances/domain/alternance';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import { AlternanceFilter } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';

import { Either } from '../../errors/either';

export interface LaBonneAlternanceRepository {
	getMetier(recherche: string): Promise<Either<Array<MetierAlternance>>>
	search(filtre: AlternanceFilter): Promise<Either<Array<Alternance>>>
}
