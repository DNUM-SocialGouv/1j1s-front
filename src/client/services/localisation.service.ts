import { HttpClientService } from '~/client/services/httpClient.service';
import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import {
  Localisation,
  LocalisationList,
} from '~/server/localisations/domain/localisation';
import {
  LocalisationApiResponse,
  LocalisationListApiResponse,
} from '~/server/localisations/infra/controllers/LocalisationListApiResponse';


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

    const { data } = await this.httpClientService.get<LocalisationListApiResponse>(`localisations?recherche=${recherche}`);
    const { communeList, régionList, départementList } = data;
    return {
      communeList: communeList.map(({ code, codeInsee, libelle }) => ({ code, codeInsee: CodeInsee.createCodeInsee(codeInsee), libelle })),
      départementList: départementList.map(({ code, codeInsee, libelle }) => ({ code, codeInsee: CodeInsee.createCodeInsee(codeInsee), libelle })),
      régionList: régionList.map(({ code, codeInsee, libelle }) => ({ code, codeInsee: CodeInsee.createCodeInsee(codeInsee), libelle })),
    };
  }

  async récupérerLocalisationAvecCodeInsee(typeLocalisation: string, codeInsee: string): Promise<Localisation> {
    const response = await this.httpClientService.get<LocalisationApiResponse>(`localisation?typeLocalisation=${typeLocalisation}&codeInsee=${codeInsee}`);
    return {
      code: response.data.code,
      codeInsee: CodeInsee.createCodeInsee(response.data.codeInsee),
      libelle: response.data.libelle,
    };
  }
}
