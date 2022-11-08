import axios, { AxiosError } from 'axios';

import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import {
  LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { ApiAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresse.response';
import { mapRésultatsRechercheCommune } from '~/server/localisations/infra/repositories/apiLocalisation.mapper';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { LoggerService } from '~/server/services/logger.service';

export class ApiAdresseRepository implements LocalisationAvecCoordonnéesRepository {
  constructor(
    private readonly httpClientService: HttpClientService,
  ) {
  }

  async getCommuneList(adresseRecherchée: string): Promise<Either<RésultatsRechercheCommune>> {
    try {
      const response = await this.httpClientService.get<ApiAdresseResponse>(
        `search/?q=${adresseRecherchée}&type=municipality&limit=21`,
      );
      return createSuccess(mapRésultatsRechercheCommune(response.data));
    } catch (e) {
      if(axios.isAxiosError(e)) {
        const error: AxiosError<ApiAdresseErrorResponse> = e as AxiosError<ApiAdresseErrorResponse>;
        if(error.response?.status === 400 && error.response.data.message === 'q must contain at least 3 chars and start with a number or a letter') {
          return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
        }
      }
      LoggerService.error('[API Adresse] impossible de rechercher');
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }
}

interface ApiAdresseErrorResponse {
  message: string
}
