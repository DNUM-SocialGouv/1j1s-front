import { Alternance, AlternanceFiltre, RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Either } from '~/server/errors/either';

export interface AlternanceRepository {
	search(filtre: AlternanceFiltre): Promise<Either<RésultatRechercheAlternance>>

	get(id: string): Promise<Either<Alternance>>
}
