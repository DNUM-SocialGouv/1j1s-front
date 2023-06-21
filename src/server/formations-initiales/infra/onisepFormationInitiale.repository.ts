import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

import { createSuccess, Either } from '../../errors/either';
import { FormationInitiale } from '../domain/formationInitiale';
import { FormationInitialeRepository } from '../domain/formationInitiale.repository';

/*
"code_nsf": "110",
"sigle_type_formation": "CPGE",
"libelle_type_formation": "classe préparatoire scientifique et technologique",
"libelle_formation_principal": "Classe préparatoire Technologie et sciences industrielles (TSI), 2e année",
"sigle_formation": "",
"duree": "1 an",
"niveau_de_sortie_indicatif": "Bac + 2",
"code_rncp": "",
"niveau_de_certification": "3",
"libelle_niveau_de_certification": "niveau 5 (bac + 2)",
"tutelle": "Ministère chargé de l'Enseignement supérieur et de la Recherche",
"url_et_id_onisep": "http://www.onisep.fr/http/redirection/formation/slug/FOR.3311",
"domainesous-domaine": "mécanique/automatismes | sciences/chimie | électricité, électronique, robotique/électronique | électricité, électronique, robotique/électrotechnique | mécanique/mécanique (généralités) | sciences/physique | électricité, électronique, robotique/télécommunications"
* */
export interface FormationInitialeApiResponse {
	code_nsf: string,
	sigle_type_formation: string,
	libelle_type_formation: string,
	libelle_formation_principal: string,
	sigle_formation: string,
	duree: string,
	niveau_de_sortie_indicatif: string,
	code_rncp: string,
	niveau_de_certification: string,
	libelle_niveau_de_certification: string,
	tutelle: string,
	url_et_id_onisep: string,
	'domainesous-domaine': string
}

export class OnisepFormationInitialeRepository implements FormationInitialeRepository {
	constructor(private readonly httpClient: AuthenticatedHttpClientService, private readonly errorManagementService: ErrorManagementService) {}

	async search(): Promise<Either<Array<FormationInitiale>>> {
		try {
			const { data }= await this.httpClient.get<Array<FormationInitialeApiResponse>>('/dataset/5fa591127f501/search');
			const formationsInitiales = data.map((formationInitialeApiResponse) => ({ libelle: formationInitialeApiResponse.libelle_formation_principal }));
			return createSuccess(formationsInitiales);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: '[API Onisep]',
				contexte: 'recherche de formation initiale',
				message: 'impossible d’effectuer une recherche de formation initiale',
			});
		}
	}
}
