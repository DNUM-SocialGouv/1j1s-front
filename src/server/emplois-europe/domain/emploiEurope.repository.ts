import { EmploiEuropeFiltre, ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { Either } from '~/server/errors/either';

export interface EmploiEuropeRepository {
	search(filtre: EmploiEuropeFiltre): Promise<Either<ResultatRechercheEmploiEurope>>
}
