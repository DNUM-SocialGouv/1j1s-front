import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';

export class ConsulterFicheMetierUseCase {
	constructor(private ficheMetierRepository: FicheMetierRepository) {}

	async handle(nom: string): Promise<Either<FicheMétier>> {
		return this.ficheMetierRepository.getFicheMetierByNom(nom);
	}
}
