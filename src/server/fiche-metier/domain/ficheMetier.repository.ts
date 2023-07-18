import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

export interface FicheMetierRepository {
	getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>>
	listAllFicheMetierNomMetier(): Promise<Either<Array<string>>>
}
