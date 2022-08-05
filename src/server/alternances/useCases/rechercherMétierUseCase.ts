import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';

export class RechercherMétierUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {}

  async handle(métierRecherché: string) {
    const reponseMetierList = await this.alternanceRepository.getMétierRecherchéList(métierRecherché);
    reponseMetierList.sort((a, b) => a.intitulé.toLowerCase().localeCompare(b.intitulé.toLowerCase()));

    return reponseMetierList;
  }
}
