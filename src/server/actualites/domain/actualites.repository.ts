import { Actualite } from '~/server/actualites/domain/actualite';
import { Either } from '~/server/errors/either';

export interface ActualitesRepository {
	getActualitesList(): Promise<Either<Array<Actualite>>>
	getActualitesEchantillonList(): Promise<Either<Array<Actualite>>>
}
