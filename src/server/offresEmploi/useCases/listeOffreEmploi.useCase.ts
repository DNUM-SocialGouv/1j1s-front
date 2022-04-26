import { OffreEmploiFiltre } from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';

export class ListeOffreEmploiUseCase {
  constructor(private emploiRepository: OffreEmploiRepository) {}

  async handle(offreEmploiFiltre: OffreEmploiFiltre) {
    return await this.emploiRepository.getOffreEmploiList(offreEmploiFiltre);
  }
}
