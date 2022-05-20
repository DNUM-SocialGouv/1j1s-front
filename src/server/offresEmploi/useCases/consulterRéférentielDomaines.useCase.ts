import { Either } from '~/server/errors/either';
import { RéférentielDomaine } from '~/server/offresEmploi/domain/référentiel';
import { RéférentielRepository } from '~/server/offresEmploi/domain/référentiel.repository';

export class ConsulterRéférentielDomainesUseCase {
  constructor(private référentielRepository: RéférentielRepository) {
  }

  async handle(): Promise<Either<RéférentielDomaine[]>> {
    return this.référentielRepository.getRéférentielDomaines();
  }
}
