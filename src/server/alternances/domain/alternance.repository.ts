import { Alternance, AlternanceFiltre, ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Either } from '~/server/errors/either';

export interface AlternanceRepository {
	search(filtre: AlternanceFiltre): Promise<Either<ResultatRechercheAlternance>>

	get(id: string): Promise<Either<Alternance>>
}
