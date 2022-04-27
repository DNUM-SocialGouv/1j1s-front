import {
  NOMBRE_RESULTATS_PAR_PAGE,
  OffreEmploi,
  OffreEmploiFiltre,
} from '~/server/offresEmploi/domain/offreEmploi';
import { OffreEmploiRepository } from '~/server/offresEmploi/domain/offreEmploi.repository';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

export class ApiPoleEmploiOffreRepository implements OffreEmploiRepository {
  constructor(
    private poleEmploiHttpClientService: PoleEmploiHttpClientService,
  ) {
  }

  async getOffreEmploiList(offreEmploiFiltre: OffreEmploiFiltre): Promise<OffreEmploi[]> {
    LoggerService.info(`Recherche offre emploi avec filtres ${JSON.stringify(offreEmploiFiltre)}`);
    const paramètresRecherche = this.buildParamètresRecherche(offreEmploiFiltre);
    const response = await this.poleEmploiHttpClientService.get<OffreEmploiResponse>(
      `partenaire/offresdemploi/v2/offres/search?${paramètresRecherche}`,
    );

    return response.data.resultats.map((offreEmploi) => ({
      ...offreEmploi,
    }));
  }

  buildParamètresRecherche(offreEmploiFiltre: OffreEmploiFiltre): string {
    const range = `${(offreEmploiFiltre.page - 1) * NOMBRE_RESULTATS_PAR_PAGE}-${offreEmploiFiltre.page * NOMBRE_RESULTATS_PAR_PAGE - 1}`;
    return `range=${range}&motsCles=${offreEmploiFiltre.motClé ?? ''}`;
  }
}

interface OffreEmploiResponse {
  resultats: OffreEmploiDataResponse[];
}

interface OffreEmploiDataResponse {
  id: string;
  intitule: string;
  description: string;
  qualificationLibelle: string;
  typeContrat: string;
  dureeTravailLibelleConverti: string;
  entreprise: Entreprise;
}

interface Entreprise {
  nom: string;
}
