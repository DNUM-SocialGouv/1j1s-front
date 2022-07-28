import { HttpClientService } from '~/client/services/httpClient.service';
import { Either, Success } from '~/server/errors/either';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
  RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

export class LocalisationService {
  constructor(private readonly httpClientService: HttpClientService ) {}
  private MAX_CHAR_LENGTH = 5;
  private REGEX_ALL_LETTRES_AVEC_ACCENTS_TIRET_ESPACE_AND_DIGITS = new RegExp(/^[\da-zA-ZÀ-ÖØ-öø-ÿ-\\-\\ ]+$/);
  private REGEX_ALL_DIGITS = new RegExp(/^\d*$/);
  private FORBIDDEN_CHAR_LENGTH = [1, 3, 4];

  async rechercherLocalisation(recherche: string): Promise<RechercheLocalisationApiResponse | null>  {
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

    const response = await this.httpClientService.get<RechercheLocalisationApiResponse>(`localisations?recherche=${recherche}`);
    // TODO gérer les erreurs dans la liste déroulante ?
    return (response as Success<RechercheLocalisationApiResponse>).result;
  }

  async rechercherCommune(recherche:string): Promise<Either<RésultatsRechercheCommune>> {
    return await this.httpClientService.get<RésultatsRechercheCommune>(`communes?q=${recherche}`);
  }
}
