import { Either } from '~/server/errors/either';
import { Metier } from '~/server/metiers/domain/metier';
import { MétierRepository } from '~/server/metiers/domain/métier.repository';

export class RécupérerMétiersUseCase {
	constructor(private métierRepository: MétierRepository) {}

	async handle(recherche: string): Promise<Either<Array<Metier>>> {
		return this.métierRepository.getMetierList(recherche);
	}
}
