import { Either } from '~/server/errors/either';
import { FicheMetierFiltresRecherche, FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';

export interface FicheMetierRepository {
	rechercher(filtres: FicheMetierFiltresRecherche): Promise<Either<FicheMétierResult>>
}
