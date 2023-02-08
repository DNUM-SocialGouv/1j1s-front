import { Either } from '~/server/errors/either';

import {
	Alternance,
	AlternanceQuery,
} from '../domain/alternance';
import { LaBonneAlternanceRepository } from '../domain/LaBonneAlternance.repository';

export class RechercherAlternanceLaBonneAlternanceUseCase {
	constructor(private repository: LaBonneAlternanceRepository) {}

	async handle(alternanceFiltre: AlternanceQuery): Promise<Either<Array<Alternance>>> {
		return this.repository.search(alternanceFiltre);
	}
}
