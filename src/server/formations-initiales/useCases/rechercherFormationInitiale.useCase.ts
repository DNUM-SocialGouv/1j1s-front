import { Either } from '../../errors/either';
import { FormationInitiale, FormationInitialeFiltre } from '../domain/formationInitiale';
import { FormationInitialeRepository } from '../domain/formationInitiale.repository';

export class RechercherFormationInitialeUseCase {
	constructor(private readonly formationInitialeRepository: FormationInitialeRepository) {}

	async handle(filtre: FormationInitialeFiltre): Promise<Either<Array<FormationInitiale>>> {
		return this.formationInitialeRepository.search(filtre);
	}
}
