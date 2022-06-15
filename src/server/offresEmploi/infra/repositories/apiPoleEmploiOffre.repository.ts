import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';
import axios  from 'axios';

import {
  createFailure,
  createSuccess,
  Either,
} from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import {
  NOMBRE_RÉSULTATS_PAR_PAGE,
  OffreEmploi,
  OffreEmploiFiltre,
  OffreEmploiId,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';
import {
  mapOffreEmploi,
  mapRésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.mapper';
import {
  OffreEmploiResponse,
  RésultatsRechercheOffreEmploiResponse,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
  ) {
  }

  async getOffreEmploi(id: OffreEmploiId): Promise<Either<OffreEmploi>> {
    try {
      const response = await this.poleEmploiHttpClientService.get<OffreEmploiResponse>(
        `partenaire/offresdemploi/v2/offres/${id}`,
      );
      if (response.status === 204) {
        return createFailure(ErrorType.CONTENU_INDISPONIBLE);
      } else {
        return createSuccess(mapOffreEmploi(response.data));
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  async searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<Either<RésultatsRechercheOffreEmploi>> {
    const paramètresRecherche = this.buildParamètresRecherche(offreEmploiFiltre);
    let response;

    try {
      response = await this.poleEmploiHttpClientService.get<RésultatsRechercheOffreEmploiResponse>(
        `partenaire/offresdemploi/v2/offres/search?${paramètresRecherche}`,
      );
      if (response.status === 204) {
        return createSuccess({ nombreRésultats: 0, résultats: [] });
      } else {
        return createSuccess(mapRésultatsRechercheOffreEmploi(response.data));
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
        if (e.response?.status === 400) {
          return createFailure(ErrorType.DEMANDE_INCORRECTE);
        }
      }
      Sentry.captureMessage(`API_POLE_EMPLOI ${e}`, CaptureContext.Severity.Error);
      Sentry.captureMessage(`API_POLE_EMPLOI ${JSON.stringify(response)}`, CaptureContext.Severity.Error);
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  buildParamètresRecherche(offreEmploiFiltre: OffreEmploiFiltre): string {
    const range = `${(offreEmploiFiltre.page - 1) * NOMBRE_RÉSULTATS_PAR_PAGE}-${offreEmploiFiltre.page * NOMBRE_RÉSULTATS_PAR_PAGE - 1}`;

    const localisation = ApiPoleEmploiOffreRepository.buildParamètreLocalisation(offreEmploiFiltre);

    function mapTempsDeTravail() {
      if (offreEmploiFiltre.tempsDeTravail === 'tempsPlein') return 'true';
      if (offreEmploiFiltre.tempsDeTravail === 'tempsPartiel') return 'false';
      return '';
    }

    // eslint-disable-next-line
    const queryList: Record<string, any> = {
      experienceExigence: offreEmploiFiltre.experienceExigenceList.join(','),
      grandDomaine: offreEmploiFiltre.grandDomaineList.join(','),
      motsCles: offreEmploiFiltre.motClé || '',
      range,
      tempsPlein: mapTempsDeTravail(),
      typeContrat: offreEmploiFiltre.typeDeContratList.join(','),
      ...localisation,
      dureeHebdoMax: offreEmploiFiltre.dureeHebdoMax,
    };

    Object.keys(queryList).forEach((key: string) => {
      if (!queryList[key.toString()]) delete queryList[key];
    });

    const params = new URLSearchParams(queryList);

    return params.toString();
  }

  private static buildParamètreLocalisation(offreEmploiFiltre: OffreEmploiFiltre): object | undefined {
    if (offreEmploiFiltre.localisation) {
      const typeLocalisation = offreEmploiFiltre.localisation.typeLocalisation;
      if (typeLocalisation === TypeLocalisation.REGION) {
        return { region: offreEmploiFiltre.localisation.codeInsee.value };
      } else if (typeLocalisation === TypeLocalisation.DEPARTEMENT) {
        return { departement: offreEmploiFiltre.localisation.codeInsee.value };
      } else if (typeLocalisation === TypeLocalisation.COMMUNE) {
        return { commune: offreEmploiFiltre.localisation.codeInsee.valueOrCodePostal };
      }
    } else {
      return undefined;
    }
  }
}
