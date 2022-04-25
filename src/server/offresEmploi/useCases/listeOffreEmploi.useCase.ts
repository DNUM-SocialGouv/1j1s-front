import { OffreEmploiRepository } from "~/server/offresEmploi/domain/offreEmploi.repository";

export class ListeOffreEmploiUseCase {
  constructor(private emploiRepository: OffreEmploiRepository) {}

  async handle() {
    return await this.emploiRepository.getOffreEmploiList();
  }
}
