import {
  NOMBRE_RÉSULTATS_PAR_PAGE,
  OffreEmploiFiltre,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';
import { mapRésultatsRechercheOffreEmploi } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.mapper';
import { RésultatsRechercheOffreEmploiResponse } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
  ) {
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
    return `range=${range}&motsCles=${offreEmploiFiltre.motClé ?? ''}`;
  }
}
