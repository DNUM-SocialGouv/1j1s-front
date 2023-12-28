import { Either } from '~/server/errors/either';
import { MetierAlternance } from '~/server/metiers/domain/metier';
import { MétierRepository } from '~/server/metiers/domain/métier.repository';

export class RécupérerMétiersUseCase {
	constructor(private métierRepository: MétierRepository) {}

	async handle(recherche: string): Promise<Either<Array<MetierAlternance>>> {
		return this.métierRepository.getMetierList(recherche);
	}
}
