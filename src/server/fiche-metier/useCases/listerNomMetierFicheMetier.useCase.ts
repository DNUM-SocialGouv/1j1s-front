import { Either } from '~/server/errors/either';
import { StrapiFicheMetierRepository } from '~/server/fiche-metier/infra/strapiFicheMetier.repository';

export class ListerNomMetierFicheMétierUseCase {
	constructor(private strapiFicheMetierRepository: StrapiFicheMetierRepository) {}

	handle(): Promise<Either<Array<string>>> {
		return this.strapiFicheMetierRepository.listAllFicheMetierNomMetier();
	}
}
