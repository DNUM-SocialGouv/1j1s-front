import { Either } from '~/server/errors/either';
import { FicheMetierFiltresRecherche, FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';

export class RechercherFicheMetierUseCase {
  constructor(private ficheMetierRepository: FicheMetierRepository) {}
	
  async handle(filtres: FicheMetierFiltresRecherche): Promise<Either<FicheMétierResult>> {
    return this.ficheMetierRepository.rechercher(filtres);
  }
}
