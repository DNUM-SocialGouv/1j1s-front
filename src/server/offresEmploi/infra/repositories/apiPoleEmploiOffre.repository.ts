import { createFailure, createSuccess, Either } from '~/server/errors/either';
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
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
    private apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  ) {
  }

  async getOffreEmploi(id: OffreEmploiId): Promise<Either<OffreEmploi>> {
    const response = await this.poleEmploiHttpClientService.get<OffreEmploiResponse, OffreEmploi>(
      `partenaire/offresdemploi/v2/offres/${id}`,
      mapOffreEmploi,
    );

    switch (response.instance) {
      case 'success': return createSuccess(response.result.data);
      case 'failure': return response;
    }
  }

  async searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<Either<RésultatsRechercheOffreEmploi>> {
    const paramètresRecherche = await this.buildParamètresRecherche(offreEmploiFiltre);
    const response = await this.poleEmploiHttpClientService.get<RésultatsRechercheOffreEmploiResponse, RésultatsRechercheOffreEmploi>(
      `partenaire/offresdemploi/v2/offres/search?${paramètresRecherche}`,
      mapRésultatsRechercheOffreEmploi,
    );

    switch (response.instance) {
      case 'success': return createSuccess(response.result.data);
      case 'failure': return response;
    }

  }

  async buildParamètresRecherche(offreEmploiFiltre: OffreEmploiFiltre): Promise<string> {
    const range = `${(offreEmploiFiltre.page - 1) * NOMBRE_RÉSULTATS_PAR_PAGE}-${offreEmploiFiltre.page * NOMBRE_RÉSULTATS_PAR_PAGE - 1}`;

    const localisation = await this.buildParamètreLocalisation(offreEmploiFiltre);

    function mapTempsDeTravail() {
      if (offreEmploiFiltre.tempsDeTravail === 'tempsPlein') return 'true';
      if (offreEmploiFiltre.tempsDeTravail === 'tempsPartiel') return 'false';
      return '';
    }

    // eslint-disable-next-line
    const queryList: Record<string, any> = {
      experienceExigence: offreEmploiFiltre.experienceExigence,
      grandDomaine: offreEmploiFiltre.grandDomaineList.join(','),
      motsCles: offreEmploiFiltre.motClé || '',
      range,
      tempsPlein: mapTempsDeTravail(),
      typeContrat: offreEmploiFiltre.typeDeContratList.join(','),
      ...localisation,
      dureeHebdoMax: offreEmploiFiltre.dureeHebdoMax,
    };

    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }

  private async buildParamètreLocalisation(offreEmploiFiltre: OffreEmploiFiltre) {
    if (offreEmploiFiltre.localisation) {
      const typeLocalisation = offreEmploiFiltre.localisation.type;
      if (typeLocalisation === TypeLocalisation.REGION) {
        return { region: offreEmploiFiltre.localisation.code };
      } else if (typeLocalisation === TypeLocalisation.DEPARTEMENT) {
        return { departement: offreEmploiFiltre.localisation.code };
      } else if (typeLocalisation === TypeLocalisation.COMMUNE) {
        const codeInseeInRéférentiel = await this.apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune(offreEmploiFiltre.localisation.code);
        return { commune: codeInseeInRéférentiel };
      }
    } else {
      return undefined;
    }
  }
}
