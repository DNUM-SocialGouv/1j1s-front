import { AlternanceFiltre, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';

export class RechercherAlternanceUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {}

  async handle(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance> {
    return await this.alternanceRepository.getAlternanceList(alternanceFiltre);
  }
}
