import {
  RéférentielDomaine,
} from '~/server/offresEmploi/domain/référentiel';
import { RéférentielRepository } from '~/server/offresEmploi/domain/référentiel.repository';
import { RéférentielDomaineResponse } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiReferentiel.response';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

export class ApiPoleEmploiRéférentielRepository implements RéférentielRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
  ) {}

  async getRéférentielDomaines(): Promise<RéférentielDomaine[]> {
    LoggerService.info('Récupération référentiel domaines');
    const response = await this.poleEmploiHttpClientService.get<RéférentielDomaineResponse[]>(
      'partenaire/offresdemploi/v2/referentiel/domaines',
    );
    return response.data;
  }
}
