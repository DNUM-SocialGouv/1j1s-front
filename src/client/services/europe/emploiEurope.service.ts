import { EmploiEuropeQueryParams } from '~/client/hooks/useEmploiEuropeQuery';
import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { Either } from '~/server/errors/either';

export interface EmploiEuropeService {
	rechercherEmploiEurope(query: EmploiEuropeQueryParams): Promise<Either<ResultatRechercheEmploiEurope>>;
}
