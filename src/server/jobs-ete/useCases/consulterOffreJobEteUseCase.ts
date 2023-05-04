import { Either } from '~/server/errors/either';
import { Offre, OffreId } from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';

export class ConsulterOffreJobEteUseCase {
	constructor(private offreRepository: OffreRepository) {
	}

	async handle(id: OffreId): Promise<Either<Offre>> {
		return this.offreRepository.get(id);
	}
}
