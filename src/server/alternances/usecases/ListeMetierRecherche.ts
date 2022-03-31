import { AlternanceRepository } from "../domain/AlternanceRepository";

export class ListeMetierRecherche {
  constructor(private alternanceRepository: AlternanceRepository) {}

  async handle(metierRecherche: string) {
    return await this.alternanceRepository.listeMetierRecherche(
      metierRecherche
    );
  }
}
