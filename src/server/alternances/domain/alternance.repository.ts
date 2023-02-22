import {
	Alternance,
	AlternanceFiltre,
} from '~/server/alternances/domain/alternance';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import { Either } from '~/server/errors/either';

export interface AlternanceRepository {
	getMetierList(recherche: string): Promise<Either<Array<MetierAlternance>>>
	search(filtre: AlternanceFiltre): Promise<Either<Array<Alternance>>>
}
