import { Either } from '~/server/errors/either';

import { LaBonneAlternanceRepository } from '../domain/LaBonneAlternance.repository';
import { MetierAlternance } from '../domain/métier';

export class RécupererSuggestionsMetiersAlternanceUseCase {
	constructor(private laBonneAlternanceRepository: LaBonneAlternanceRepository) {}

	async handle(recherche: string): Promise<Either<Array<MetierAlternance>>> {
		return this.laBonneAlternanceRepository.getMetier(recherche);
	}
}
