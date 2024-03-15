import { Either } from '~/server/errors/either';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';

export interface LocalisationAvecCoordonnéesRepository {
  getCommuneList(adresseRecherchée: string): Promise<Either<RésultatsRechercheCommune>>;
	getCommuneListByLongitudeLatitude(longitude: number, latitude: number): Promise<Either<RésultatsRechercheCommune>>;
}
