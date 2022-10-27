import { Either } from '~/server/errors/either';
import { OffreFiltre, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';

export class RechercherAlternanceUseCase {
  constructor(private offreRepository: OffreRepository) {}

  async handle(offreFiltre: OffreFiltre): Promise<Either<RésultatsRechercheOffre>> {
    return await this.offreRepository.search(offreFiltre);
  }
}
