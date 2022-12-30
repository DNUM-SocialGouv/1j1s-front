import { Either } from '~/server/errors/either';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { LocalisationAvecCoordonnéesRepository } from '~/server/localisations/domain/localisationAvecCoordonnées.repository';

export class RechercherCommuneUseCase {
	constructor(private localisationAvecCoordonnéesRepository: LocalisationAvecCoordonnéesRepository) {
	}

	async handle(recherche: string): Promise<Either<RésultatsRechercheCommune>> {
		return await this.localisationAvecCoordonnéesRepository.getCommuneList(recherche);
	}
}
