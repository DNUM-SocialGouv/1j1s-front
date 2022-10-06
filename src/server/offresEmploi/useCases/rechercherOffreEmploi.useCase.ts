import { Either } from '~/server/errors/either';
import {
  OffreFiltre,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';

export class RechercherOffreEmploiUseCase {
  constructor(private emploiRepository: OffreEmploiRepository) {
  }

  async handle(offreEmploiFiltre: OffreFiltre): Promise<Either<RésultatsRechercheOffreEmploi>> {
    return await this.emploiRepository.searchOffreEmploi(offreEmploiFiltre);
  }
}
