import { Either } from '~/server/errors/either';

import { Alternance } from '../domain/alternance';
import { AlternanceRepository } from '../domain/alternance.repository';

export class ConsulterOffreAlternancePoleEmploiUseCase {
	constructor(private alternanceRepository: AlternanceRepository) {
	}

	async handle(id: string, rome: string): Promise<Either<Alternance>> {
		return this.alternanceRepository.get(id, rome);
	}
}
