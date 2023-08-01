import { Either } from '~/server/errors/either';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';

export class ListerNomMetierFicheMétierUseCase {
	constructor(private ficheMetierRepository: FicheMetierRepository) {}

	handle(): Promise<Either<Array<string>>> {
		return this.ficheMetierRepository.listAllFicheMetierNomMetier();
	}
}
