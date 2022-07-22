import axios from 'axios';

import { HttpClientService } from '~/client/services/httpClient.service';
import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import {  Localisation } from '~/server/localisations/domain/localisation';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
  LocalisationApiResponse,
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

    const { data } = await this.httpClientService.get<RechercheLocalisationApiResponse>(`localisations?recherche=${recherche}`);
    return data;
  }

  async récupérerLocalisationAvecCodeInsee(typeLocalisation: string, codeInsee: string): Promise<Localisation> {
    const response = await this.httpClientService.get<LocalisationApiResponse>(`localisation?typeLocalisation=${typeLocalisation}&codeInsee=${codeInsee}`);
    return response.data;
  }

  async rechercherCommune(recherche:string): Promise<Either<RésultatsRechercheCommune>> {
    try {
      const response = await this.httpClientService.get<RésultatsRechercheCommune>(`communes?q=${recherche}`);
      return createSuccess(response.data);
    }  catch (e) {
      if (axios.isAxiosError(e)) {
        if(e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }
}
