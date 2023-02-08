import { Either } from '~/server/errors/either';

import { Alternance } from '../domain/alternance';
import { LaBonneAlternanceRepository } from '../domain/LaBonneAlternance.repository';
import { AlternanceFilter } from '../infra/repositories/apiLaBonneAlternance.repository';

export class RechercherAlternanceLaBonneAlternanceUseCase {
	constructor(private repository: LaBonneAlternanceRepository) {}

	async handle(offreFiltre: AlternanceFilter): Promise<Either<Array<Alternance>>> {
		return this.repository.search(offreFiltre);
	}
}
