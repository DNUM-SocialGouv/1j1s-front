import { OffreEmploi, OffreEmploiId } from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';

export class ConsulterOffreEmploiUseCase {
  constructor(private emploiRepository: OffreEmploiRepository) {
  }

  async handle(id: OffreEmploiId): Promise<OffreEmploi> {
    return await this.emploiRepository.getOffreEmploi(id);
  }
}
