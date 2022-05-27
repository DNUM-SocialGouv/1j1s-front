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
import { LoggerService } from '~/server/services/logger.service';

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
  ) {
  }

  async getOffreEmploi(id: OffreEmploiId): Promise<OffreEmploi> {
    LoggerService.info(`Récupération offre emploi ${id}`);
    const response = await this.poleEmploiHttpClientService.get<OffreEmploiResponse>(
      `partenaire/offresdemploi/v2/offres/${id}`,
    );
    return mapOffreEmploi(response.data);
  }

  async searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<Either<RésultatsRechercheOffreEmploi>> {
    LoggerService.info(`Recherche offre emploi avec filtres ${JSON.stringify(offreEmploiFiltre)}`);
    const paramètresRecherche = this.buildParamètresRecherche(offreEmploiFiltre);

    try {
      const response = await this.poleEmploiHttpClientService.get<RésultatsRechercheOffreEmploiResponse>(
        `partenaire/offresdemploi/v2/offres/search?${paramètresRecherche}`,
      );
      if (response.status === 204) {
        return createSuccess({ nombreRésultats: 0, résultats: [] });
      } else {
        return createSuccess(mapRésultatsRechercheOffreEmploi(response.data));
      }
      // eslint-disable-next-line
    } catch (e: any) {
      if (e.response.status === 500) {
        return createFailure(ErrorType.SERVICE_INDISPONIBLE);
      }
      if (e.response.status === 400) {
        return createFailure(ErrorType.DEMANDE_INCORRECTE);
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  buildParamètresRecherche(offreEmploiFiltre: OffreEmploiFiltre): string {
    const range = `${(offreEmploiFiltre.page - 1) * NOMBRE_RÉSULTATS_PAR_PAGE}-${offreEmploiFiltre.page * NOMBRE_RÉSULTATS_PAR_PAGE - 1}`;

    const localisation = ApiPoleEmploiOffreRepository.buildParamètreLocalisation(offreEmploiFiltre);

    // eslint-disable-next-line
    const queryList: Record<string, any> = {
      experienceExigence: offreEmploiFiltre.experienceExigence.join(','),
      grandDomaine: offreEmploiFiltre.grandDomaine.join(','),
      motsCles: offreEmploiFiltre.motClé || '',
      range,
      tempsPlein: offreEmploiFiltre.tempsPlein,
      typeContrat: offreEmploiFiltre.typeDeContrats.join(','),
      ...localisation,
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
      const codeInsee = offreEmploiFiltre.localisation.codeInsee;
      if (typeLocalisation === TypeLocalisation.REGION) {
        return { region: codeInsee };
      } else if (typeLocalisation === TypeLocalisation.DEPARTEMENT) {
        return { departement: codeInsee };
      } else if (typeLocalisation === TypeLocalisation.COMMUNE) {
        return { commune: codeInsee };
      }
    } else {
      return undefined;
    }
  }
}
