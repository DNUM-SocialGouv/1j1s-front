import { AlternanceRepository } from "../domain/alternance.repository";

export class ListeMetierRechercheUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {}

  async handle(metierRecherche: string) {
    return await this.alternanceRepository.listeMetierRecherche(
      metierRecherche
    );
  }
}
