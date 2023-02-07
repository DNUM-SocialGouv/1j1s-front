import { Either } from '../../errors/either'
import { MetierAlternance } from '~/server/alternances/domain/métier'

export interface LaBonneAlternanceRepository {
	getMetier(recherche): Promise<Either<any>>
	get(id: OffreId): Promise<Either<Offre>>
	search(filtre: OffreFiltre): Promise<Either<RésultatsRechercheOffre>>
}