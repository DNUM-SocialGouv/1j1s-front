import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';

export class ConsulterOffreEmploiUseCase {
  constructor(private emploiRepository: OffreEmploiRepository) {
  }

  async handle(id: string): Promise<OffreEmploi> {
    return await this.emploiRepository.getOffreEmploi(id);
  }
}
