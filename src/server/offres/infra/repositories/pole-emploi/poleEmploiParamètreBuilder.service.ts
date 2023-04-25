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


	async buildCommonParamètresRecherche(offreFiltre: OffreFiltre): Promise<string> {
		const localisation = await this.buildLocalisation(offreFiltre);

		const queryList: Record<string, string> = {
			...localisation,
			motsCles: offreFiltre.motClé || '',
			range: buildRangeParamètre(offreFiltre),
		};

		removeUndefinedValueInQueryParameterList(queryList);

		const params = new URLSearchParams(queryList);

		return params.toString();
	}

	private async buildLocalisation(offreEmploiFiltre: OffreFiltre): Promise<Record<string, string>> {
		if (offreEmploiFiltre.localisation) {
			const typeLocalisation = offreEmploiFiltre.localisation.type;
			switch (typeLocalisation) {
				case TypeLocalisation.REGION:
					return { region: offreEmploiFiltre.localisation.code };
				case TypeLocalisation.DEPARTEMENT:
					return { departement: offreEmploiFiltre.localisation.code };
				case TypeLocalisation.COMMUNE: {
					const codeInseeInRéférentiel = await this.apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune(offreEmploiFiltre.localisation.code);
					return { commune: codeInseeInRéférentiel };
				}
				default:
					return {};
			}
		} else {
			return {};
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
