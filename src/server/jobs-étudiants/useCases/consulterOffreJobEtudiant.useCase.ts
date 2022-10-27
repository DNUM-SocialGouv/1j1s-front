import { Either } from '~/server/errors/either';
import { Offre, OffreId } from '~/server/offres/domain/offre';
import { OffreRepository } from '~/server/offres/domain/offre.repository';

export class ConsulterOffreJobEtudiantUseCase {
  constructor(private offreRepository: OffreRepository) {
  }

  async handle(id: OffreId): Promise<Either<Offre>> {
    return await this.offreRepository.get(id);
  }
}
