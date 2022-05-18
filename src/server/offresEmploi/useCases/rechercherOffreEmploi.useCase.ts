import { Either } from '~/server/errors/either';
import { OffreEmploiFiltre, RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';

export class RechercherOffreEmploiUseCase {
  constructor(private emploiRepository: OffreEmploiRepository) {
  }

  async handle(offreEmploiFiltre: OffreEmploiFiltre): Promise<Either<RésultatsRechercheOffreEmploi>> {
    return await this.emploiRepository.searchOffreEmploi(offreEmploiFiltre);
  }
}
