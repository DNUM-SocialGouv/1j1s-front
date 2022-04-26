import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';

export class ListeMetierRechercheUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {}

  async handle(metierRecherche: string) {
    return await this.alternanceRepository.getMétierRecherchéList(
      metierRecherche,
    );
  }
}
