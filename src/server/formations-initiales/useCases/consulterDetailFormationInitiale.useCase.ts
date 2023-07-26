import { Either } from '~/server/errors/either';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import { FormationInitialeRepository } from '~/server/formations-initiales/domain/formationInitiale.repository';

export class ConsulterDetailFormationInitialeUseCase {
	constructor(private readonly formationInitialeRepository: FormationInitialeRepository) {}

	async handle(id: string): Promise<Either<FormationInitiale>> {
		return this.formationInitialeRepository.getDetail(id);
	}
}
