import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import { Either } from '~/server/errors/either';

export class RécupererSuggestionsMetiersAlternanceUseCase {
	constructor(private laBonneAlternanceRepository: AlternanceRepository) {}

	async handle(recherche: string): Promise<Either<Array<MetierAlternance>>> {
		return this.laBonneAlternanceRepository.getMetierList(recherche);
	}
}
