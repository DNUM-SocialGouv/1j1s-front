import { Either } from '~/server/errors/either';
import {
	FormationInitialeFiltre,
	ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';
import { FormationInitialeRepository } from '~/server/formations-initiales/domain/formationInitiale.repository';

export class RechercherFormationInitialeUseCase {
	constructor(private readonly formationInitialeRepository: FormationInitialeRepository) {}

	async handle(filtre: FormationInitialeFiltre): Promise<Either<ResultatRechercheFormationsInitiales>> {
		return this.formationInitialeRepository.search(filtre);
	}
}
