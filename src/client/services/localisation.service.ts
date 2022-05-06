import { HttpClientService } from '~/client/services/httpClient.service';
import { LocalisationList } from '~/server/localisations/domain/localisation';


export class LocalisationService {
  constructor(private readonly httpClientService: HttpClientService ) {
  }
  private MAX_CHAR_LENGTH = 5;
  private REGEX_ALL_LETTRES_AVEC_ACCENTS_TIRET_ESPACE_AND_DIGITS = new RegExp(/^[\da-zA-ZÀ-ÖØ-öø-ÿ-\\-\\ ]+$/);
  private REGEX_ALL_DIGITS = new RegExp(/^\d*$/);
  private FORBIDDEN_CHAR_LENGTH = [1, 3, 4];

  async rechercheLocalisation(recherche: string): Promise<LocalisationList | null>  {
    const localisationsLength = recherche.length;
    if(localisationsLength === 1){
      return null;
    }
    if(!this.REGEX_ALL_LETTRES_AVEC_ACCENTS_TIRET_ESPACE_AND_DIGITS.test(recherche)){
      return null;
    }
    if(this.REGEX_ALL_DIGITS.test(recherche) && (this.FORBIDDEN_CHAR_LENGTH.includes(localisationsLength) || localisationsLength > this.MAX_CHAR_LENGTH)){
      return null;
    }

    const response = await this.httpClientService.get<LocalisationList>(`localisations?recherche=${recherche}`);
    return response.data;
  }
}
