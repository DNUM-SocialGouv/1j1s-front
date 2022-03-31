import { OffreEmploiRepository } from "../domain/OffreEmploiRepository";

export class ListeOffreEmploi {
  constructor(private emploiRepository: OffreEmploiRepository) {}

  async handle() {
    return await this.emploiRepository.listeOffreEmploi();
  }
}
