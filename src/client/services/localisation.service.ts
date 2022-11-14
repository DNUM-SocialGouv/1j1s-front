import { HttpClientService } from '~/client/services/httpClient.service';
import { RésultatsRechercheCommune } from '~/client/services/localisations/domain/localisationAvecCoordonnées';
import {
  RechercheLocalisationApiResponse,
} from '~/client/services/localisations/infra/controllers/RechercheLocalisationApiResponse';
import { Either } from '~/server/errors/either';

export class LocalisationService {
  constructor(private readonly httpClientService: HttpClientService ) {}
  private MAX_CHAR_LENGTH = 5;
  private REGEX_ALL_LETTRES_AVEC_ACCENTS_TIRET_ESPACE_AND_DIGITS = new RegExp(/^[\da-zA-ZÀ-ÖØ-öø-ÿ-\\-\\ ]+$/);
  private REGEX_ALL_DIGITS = new RegExp(/^\d*$/);
  private FORBIDDEN_CHAR_LENGTH = [1, 4];

  async rechercherLocalisation(recherche: string): Promise<Either<RechercheLocalisationApiResponse> | null> {
    const localisationsLength = recherche.length;
    if(localisationsLength === 1) {
      return null;
    }
    if(!this.REGEX_ALL_LETTRES_AVEC_ACCENTS_TIRET_ESPACE_AND_DIGITS.test(recherche)){
      return null;
    }
    if(this.REGEX_ALL_DIGITS.test(recherche) && (this.FORBIDDEN_CHAR_LENGTH.includes(localisationsLength) || localisationsLength > this.MAX_CHAR_LENGTH)){
      return null;
    }

    return this.httpClientService.get<RechercheLocalisationApiResponse>(`localisations?recherche=${recherche}`);
  }

  async rechercherCommune(recherche:string): Promise<Either<RésultatsRechercheCommune>> {
    return this.httpClientService.get<RésultatsRechercheCommune>(`communes?q=${recherche}`);
  }
}
