import { Either } from '~/server/errors/either';
import { OffreFiltre, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';

export class RechercherAlternancePoleEmploiUseCase {
	constructor(private offreRepository: OffreRepository) {}

	async handle(offreFiltre: OffreFiltre): Promise<Either<RésultatsRechercheOffre>> {
		return this.offreRepository.search(offreFiltre);
	}
}
