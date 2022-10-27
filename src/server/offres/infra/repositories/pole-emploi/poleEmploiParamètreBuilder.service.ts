import { EmploiFiltre } from '~/server/emplois/domain/emploi';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE, OffreFiltre } from '~/server/offres/domain/offre';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiRéférentiel.repository';
import { removeUndefinedValueInQueryParameterList } from '~/server/services/utils/urlParams.util';

export class PoleEmploiParamètreBuilderService {

  constructor(
    private apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository,
  ) {}

  private MAX_AUTHORIZED_RANGE = 1000;

  async buildCommonParamètresRecherche(offreFiltre: OffreFiltre): Promise<string | undefined> {
    if((offreFiltre.page * NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE - 1) > this.MAX_AUTHORIZED_RANGE) {
      return undefined;
    }

    const localisation = await this.buildLocalisation(offreFiltre);

    // eslint-disable-next-line
    const queryList: Record<string, any> = {
      ...localisation,
      motsCles: offreFiltre.motClé || '',
      range: buildRangeParamètre(offreFiltre),
    };

    removeUndefinedValueInQueryParameterList(queryList);

    const params = new URLSearchParams(queryList);

    return params.toString();
  }

  private async buildLocalisation(offreEmploiFiltre: OffreFiltre) {
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

export function buildRangeParamètre(offreFiltre: OffreFiltre) {
  return `${(offreFiltre.page - 1) * NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}-${offreFiltre.page * NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE - 1}`;
}

export function buildTempsDeTravailParamètre(emploiFiltre: EmploiFiltre) {
  if (emploiFiltre.tempsDeTravail === 'tempsPlein') return 'true';
  if (emploiFiltre.tempsDeTravail === 'tempsPartiel') return 'false';
  return '';
}
