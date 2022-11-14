import { RésultatsRechercheCommune } from '~/client/services/localisations/domain/localisationAvecCoordonnées';
import { Either } from '~/server/errors/either';

export interface LocalisationAvecCoordonnéesRepository {
  getCommuneList(adresseRecherchée: string): Promise<Either<RésultatsRechercheCommune>>;
}
