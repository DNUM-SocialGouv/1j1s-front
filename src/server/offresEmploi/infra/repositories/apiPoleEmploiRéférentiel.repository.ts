import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import {
  RéférentielDomaine,
} from '~/server/offresEmploi/domain/référentiel';
import { RéférentielRepository } from '~/server/offresEmploi/domain/référentiel.repository';
import { RéférentielDomaineResponse } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.response';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

export class ApiPoleEmploiRéférentielRepository implements RéférentielRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
  ) {}

  async getRéférentielDomaines(): Promise<Either<RéférentielDomaine[]>> {
    LoggerService.info('Récupération référentiel domaines');
    try {
      const response = await this.poleEmploiHttpClientService.get<RéférentielDomaineResponse[]>(
        'partenaire/offresdemploi/v2/referentiel/domaines',
      );
      return createSuccess(response.data);
    } catch(e: any) {
      if(e.response.status === 500) {
        return createFailure(ErrorType.SERVICE_INDISPONIBLE);
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }
}
