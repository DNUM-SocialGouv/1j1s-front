import { Either } from '~/server/errors/either';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';

export class RécupérerEchantillonOffreEmploiUseCase {
  constructor(private emploiRepository: OffreEmploiRepository) {
  }

  async handle(isJobEtudiant: boolean): Promise<Either<RésultatsRechercheOffreEmploi>> {
    return await this.emploiRepository.getSampleOffreEmploi(isJobEtudiant);
  }
}
