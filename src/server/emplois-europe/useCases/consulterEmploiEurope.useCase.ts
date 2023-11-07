import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import { Either } from '~/server/errors/either';

export class ConsulterEmploiEuropeUseCase {
	constructor(private repository: EmploiEuropeRepository) {}

	async handle(id: string): Promise<Either<EmploiEurope>> {
		return this.repository.get(id);
	}
}
