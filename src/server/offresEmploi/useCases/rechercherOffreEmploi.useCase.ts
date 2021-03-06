import { Either } from '~/server/errors/either';
import { OffreEmploiFiltre, R├ęsultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';

export class RechercherOffreEmploiUseCase {
  constructor(private emploiRepository: OffreEmploiRepository) {
  }

  async handle(offreEmploiFiltre: OffreEmploiFiltre): Promise<Either<R├ęsultatsRechercheOffreEmploi>> {
    return await this.emploiRepository.searchOffreEmploi(offreEmploiFiltre);
  }
}
