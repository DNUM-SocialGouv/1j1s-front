import { Either } from '../../errors/either';
import { FormationInitiale } from '../domain/formationInitiale';
import { FormationInitialeRepository } from '../domain/formationInitiale.repository';

export class RechercherFormationsInitialesUseCase {
	constructor(private readonly formationInitialeRepository: FormationInitialeRepository) {}

	async handle(): Promise<Either<Array<FormationInitiale>>> {
		return this.formationInitialeRepository.search();
	}
}
