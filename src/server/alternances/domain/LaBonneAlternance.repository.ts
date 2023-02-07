import { Either } from '../../errors/either'
import { MetierAlternance } from '~/server/alternances/domain/métier'

export interface LaBonneAlternanceRepository {
	getMetier(recherche): Promise<Either<Array<MetierAlternance>>>
	search(filtre: any): Promise<Either<any>>
}