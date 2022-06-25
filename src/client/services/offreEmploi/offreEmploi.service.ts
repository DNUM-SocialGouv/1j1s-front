import axios from 'axios';

import { HttpClientService } from '~/client/services/httpClient.service';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

export class OffreEmploiService {

  constructor(private httpClientService: HttpClientService) {}

  async rechercherOffreEmploi(query: string): Promise<Either<RésultatsRechercheOffreEmploi>> {
    try {
      const response = await this.httpClientService.get<RésultatsRechercheOffreEmploi>(`emplois?${query}`);
      return createSuccess(response.data);
    } catch (e) {
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
