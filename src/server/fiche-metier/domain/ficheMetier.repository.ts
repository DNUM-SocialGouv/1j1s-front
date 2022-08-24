import { Either } from '~/server/errors/either';
import { FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';

export interface FicheMetierRepository {
	rechercher(query: string): Promise<Either<FicheMétierResult>>
}
