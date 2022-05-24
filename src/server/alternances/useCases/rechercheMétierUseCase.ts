import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';

export class RechercheMétierUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {}

  async handle(métierRecherché: string) {
    return await this.alternanceRepository.getMétierRecherchéList(métierRecherché);
  }
}
