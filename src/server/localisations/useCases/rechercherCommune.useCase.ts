import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
	LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { ConfigurationService } from '~/server/services/configuration.service';

export class RechercherCommuneUseCase {
	constructor(private localisationAvecCoordonnéesRepository: LocalisationAvecCoordonnéesRepository, private configurationService: ConfigurationService) {
	}

	async handle(recherche: string): Promise<Either<RésultatsRechercheCommune>> {
		const minimumQueryLength = this.configurationService.getConfiguration().API_ADRESSE_MINIMUM_QUERY_LENGTH;
		if (recherche.length < minimumQueryLength) {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
		return await this.localisationAvecCoordonnéesRepository.getCommuneList(recherche);
	}
}
