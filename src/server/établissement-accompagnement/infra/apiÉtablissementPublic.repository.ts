import axios from 'axios';

import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import { mapÉtablissementAccompagnement } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.mapper';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { LoggerService } from '~/server/services/logger.service';

import { RésultatRechercheÉtablissementPublicResponse } from './apiÉtablissementPublic.response';

export enum TypeÉtablissement {
  AGENCE_POLE_EMPLOI = 'pole_emploi',
  MISSION_LOCALE = 'mission_locale',
  INFO_JEUNE = 'cij',
}

export class ApiÉtablissementPublicRepository {
  constructor(private httpClient: HttpClientService) {}

  async search({ commune, typeAccompagnement }: { commune: string, typeAccompagnement: string }): Promise<Either<ÉtablissementAccompagnement[]>> {
    try {
      const { data } = await this.httpClient.get<RésultatRechercheÉtablissementPublicResponse>(`communes/${commune}/${typeAccompagnement}`);
      return createSuccess(mapÉtablissementAccompagnement(data));
    } catch (e) {
      LoggerService.error('[API Établissement Public] Erreur lors de la recherche d‘Établissement Public');
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
        }
      }
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }
}
