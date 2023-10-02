import { EmploiEuropeFiltre, ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import { Either } from '~/server/errors/either';

export class RechercherEmploiEuropeUseCase {
	constructor(private repository: EmploiEuropeRepository) {}

	async handle(filtre: EmploiEuropeFiltre): Promise<Either<ResultatRechercheEmploiEurope>> {
		return this.repository.search(filtre);
	}
}
