import { Either } from '~/server/errors/either';
import { FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';

export class RechercherFicheMetierUseCase {
  constructor(private ficheMetierRepository: FicheMetierRepository) {}
	
  async handle(query: string): Promise<Either<FicheMétierResult>> {
    return this.ficheMetierRepository.rechercher(query);
  }
}
