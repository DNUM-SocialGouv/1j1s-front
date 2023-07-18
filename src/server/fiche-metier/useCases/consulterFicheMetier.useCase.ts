import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { StrapiFicheMetierRepository } from '~/server/fiche-metier/infra/strapiFicheMetier.repository';

export class ConsulterFicheMetierUseCase {
	constructor(private strapiFicheMetierRepository: StrapiFicheMetierRepository) {}

	async handle(nom: string): Promise<Either<FicheMétier>> {
		return this.strapiFicheMetierRepository.getFicheMetierByNom(nom);
	}
}
