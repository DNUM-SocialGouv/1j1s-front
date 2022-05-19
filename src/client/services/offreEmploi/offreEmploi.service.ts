import { AppRawDataStorage } from '~/client/cache/appRawDataStorage';
import {
  Cachable,
  cache,
} from '~/client/cache/cacheDecorator';
import { HttpClientService } from '~/client/services/httpClient.service';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { RésultatsRechercheOffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { RéférentielDomaine } from '~/server/offresEmploi/domain/référentiel';


export class OffreEmploiService extends Cachable {

  constructor(private readonly httpClientService: HttpClientService, protected readonly appRawDataStorage: AppRawDataStorage ) {
    super(appRawDataStorage);
  }

  @cache({ key: 'rechercherOffreEmploi' })
  async rechercherOffreEmploi(queryString = ''): Promise<Either<RésultatsRechercheOffreEmploi>> {
    try {
      const response = await this.httpClientService.get<RésultatsRechercheOffreEmploi>(`emplois?${queryString}`);
      return createSuccess(response.data);
    } catch (e: any) {
      if(e.response.status === 500) {
        return createFailure(ErrorType.SERVICE_INDISPONIBLE);
      }
      if(e.response.status === 400) {
        return createFailure(ErrorType.DEMANDE_INCORRECTE);
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  async récupérerRéférentielDomaine(): Promise<RéférentielDomaine[]> {
    const response = await this.httpClientService.get<RéférentielDomaine[]>('referentiel');
    return response.data;
  }
}
