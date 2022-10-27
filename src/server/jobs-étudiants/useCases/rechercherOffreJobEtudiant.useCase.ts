import { Either } from '~/server/errors/either';
import { JobEtudiantFiltre } from '~/server/jobs-étudiants/domain/jobs-étudiants';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';

export class RechercherOffreJobEtudiantUseCase {
  constructor(private offreRepository: OffreRepository) {
  }

  async handle(jobEtudiantFiltre: JobEtudiantFiltre): Promise<Either<RésultatsRechercheOffre>> {
    return await this.offreRepository.search(jobEtudiantFiltre);
  }
}
