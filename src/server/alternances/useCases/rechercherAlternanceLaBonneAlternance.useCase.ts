import {
	AlternanceFiltre, ResultatRechercheAlternance,
} from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { Either } from '~/server/errors/either';

export class RechercherAlternanceLaBonneAlternanceUseCase {
	constructor(private repository: AlternanceRepository) {}

	async handle(alternanceFiltre: AlternanceFiltre): Promise<Either<ResultatRechercheAlternance>> {
		return this.repository.search(alternanceFiltre);
	}
}
