import { Either } from '~/server/errors/either';
import { Formation, FormationFiltre } from '~/server/formations/domain/formation';
import { FormationRepository } from '~/server/formations/domain/formation.repository';

export class ConsulterFormationUseCase {
	constructor(private repository: FormationRepository) {}

	async handle(id: string, filtre?: FormationFiltre): Promise<Either<Formation>> {
		return this.repository.get(id, filtre);
	}
}
