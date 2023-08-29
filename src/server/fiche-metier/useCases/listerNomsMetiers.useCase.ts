import { Either } from '~/server/errors/either';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';

export class ListerNomsMetiersUseCase {
	constructor(private ficheMetierRepository: FicheMetierRepository) {}

	handle(): Promise<Either<Array<string>>> {
		return this.ficheMetierRepository.getAllNomsMetiers();
	}
}
