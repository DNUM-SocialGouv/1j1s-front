import { Actualite } from '~/server/actualites/domain/actualite';
import { ActualitesRepository } from '~/server/actualites/domain/actualites.repository';
import { Either } from '~/server/errors/either';

export class ConsulterActualitesAccueilUseCase {
	constructor(private actualitesRepository: ActualitesRepository) {}

	async handle(): Promise<Either<Array<Actualite>>> {
		return this.actualitesRepository.getActualitesAccueilList();
	}
}
