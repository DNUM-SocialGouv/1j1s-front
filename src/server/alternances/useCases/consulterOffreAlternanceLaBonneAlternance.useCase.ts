import { Alternance } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { Either } from '~/server/errors/either';

export class ConsulterOffreAlternanceLaBonneAlternanceUseCase {
	constructor(private alternanceRepository: AlternanceRepository) {
	}

	async handle(id: string): Promise<Either<Alternance>> {
		return this.alternanceRepository.get(id);
	}
}
