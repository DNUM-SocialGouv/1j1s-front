import axios from 'axios';

import { HttpClientService } from '~/client/services/httpClient.service';
import { R├ęsultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';

export class AlternanceService {

  constructor(private httpClientService: HttpClientService) {}

  async rechercherAlternance(queryString = ''): Promise<Either<R├ęsultatsRechercheAlternance>> {
    try {
      const response = await this.httpClientService.get<R├ęsultatsRechercheAlternance>(`alternances?${queryString}`);
      return createSuccess(response.data);
    }  catch (e) {
      if (axios.isAxiosError(e)) {
        if(e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
        if(e.response?.status === 400) {
          return createFailure(ErrorType.DEMANDE_INCORRECTE);
        }
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }

  }
}
