import { Either } from '~/server/errors/either';
import { Métier } from '~/server/metiers/domain/métier';
import { MétierRepository } from '~/server/metiers/domain/métier.repository';

export class RécupérerMétiersUseCase {
	constructor(private métierRepository: MétierRepository) {}

	async handle(recherche: string): Promise<Either<Array<Métier>>> {
		return this.métierRepository.getMetierList(recherche);
	}
}
