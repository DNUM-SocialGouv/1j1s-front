import { RésultatsRechercheCommune } from '~/client/services/localisations/domain/localisationAvecCoordonnées';
import { LocalisationAvecCoordonnéesRepository } from '~/client/services/localisations/domain/localisationAvecCoordonnées.repository';
import { Either } from '~/server/errors/either';

export class RechercherCommuneUseCase {
  constructor(private localisationAvecCoordonnéesRepository: LocalisationAvecCoordonnéesRepository) {
  }

  async handle(recherche: string): Promise<Either<RésultatsRechercheCommune>> {
    return await this.localisationAvecCoordonnéesRepository.getCommuneList(recherche);
  }
}
