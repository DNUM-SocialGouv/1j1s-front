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

  async searchOffreEmploi(offreEmploiFiltre: OffreEmploiFiltre): Promise<RésultatsRechercheOffreEmploi> {
    LoggerService.info(`Recherche offre emploi avec filtres ${JSON.stringify(offreEmploiFiltre)}`);
    const paramètresRecherche = this.buildParamètresRecherche(offreEmploiFiltre);
    const response = await this.poleEmploiHttpClientService.get<RésultatsRechercheOffreEmploiResponse>(
      `partenaire/offresdemploi/v2/offres/search?${paramètresRecherche}`,
    );

    return mapRésultatsRechercheOffreEmploi(response.data);
  }

  buildParamètresRecherche(offreEmploiFiltre: OffreEmploiFiltre): string {
    const range = `${(offreEmploiFiltre.page - 1) * NOMBRE_RÉSULTATS_PAR_PAGE}-${offreEmploiFiltre.page * NOMBRE_RÉSULTATS_PAR_PAGE - 1}`;

    const localisation = ApiPoleEmploiOffreRepository.buildParamètreLocalisation(offreEmploiFiltre);

    const params = new URLSearchParams({
      motsCles: offreEmploiFiltre.motClé || '',
      range,
      typeContrat: offreEmploiFiltre.typeDeContrats.join(','),
      ...localisation,
    });
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
