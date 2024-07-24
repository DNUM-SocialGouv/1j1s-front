import { NiveauDEtude } from '~/client/domain/niveauEtudesEures';
import {
	EmploiEurope,
	EmploiEuropeFiltre,
	NiveauEtudeAPIEures,
	ResultatRechercheEmploiEurope,
} from '~/server/emplois-europe/domain/emploiEurope';
import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import {
	ApiEuresEmploiEuropeDetailItem,
	ApiEuresEmploiEuropeDetailResponse,
	ApiEuresEmploiEuropeRechercheRequestBody,
	ApiEuresEmploiEuropeRechercheResponse,
	EMPLOIS_EUROPE_ITEMS_PER_PAGE,
} from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope';
import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

export class ApiEuresEmploiEuropeRepository implements EmploiEuropeRepository {
	constructor(
		private readonly httpClientService: PublicHttpClientService,
		private readonly errorManagementService: ErrorManagementService,
		private readonly apiEuresEmploiEuropeMapper: ApiEuresEmploiEuropeMapper,
	) {
	}

	private buildSearchBody(filtre: EmploiEuropeFiltre): ApiEuresEmploiEuropeRechercheRequestBody {
		const facetCriteria = [];

		function mapNiveauEtude(niveauEtudeList: Array<NiveauDEtude>): Array<NiveauEtudeAPIEures> {
			function getNiveauEtudeApiEures(niveauEtude: NiveauDEtude) {
				switch (niveauEtude) {
					case NiveauDEtude.SANS_DIPLOME_OU_BREVET:
						return [NiveauEtudeAPIEures.ENSEIGNEMENT_PRESCOLAIRE, NiveauEtudeAPIEures.ENSEIGNEMENT_PRIMAIRE, NiveauEtudeAPIEures.ENSEIGNEMENT_SECONDAIRE_INFERIEUR];
					case NiveauDEtude.LYCEE_FORMATION_PRO:
						return [NiveauEtudeAPIEures.ENSEIGNEMENT_SECONDAIRE_SUPERIEUR, NiveauEtudeAPIEures.ENSEIGNEMENT_POST_SECONDAIRE_NON_SUPERIEUR];
					case NiveauDEtude.SUPERIEUR_COURT:
						return [NiveauEtudeAPIEures.ENSEIGNEMENT_SUPERIEUR_CYCLE_COURT];
					case NiveauDEtude.LICENCE:
						return [NiveauEtudeAPIEures.NIVEAU_LICENCE_OU_EQUIVALENT];
					case NiveauDEtude.MASTER:
						return [NiveauEtudeAPIEures.NIVEAU_MAITRISE_OU_EQUIVALENT];
					case NiveauDEtude.DOCTORAT:
						return [NiveauEtudeAPIEures.NIVEAU_DOCTORAT_OU_EQUIVALENT];
					case NiveauDEtude.AUTRE:
						return [NiveauEtudeAPIEures.AUTRE];
				}
			}

			return niveauEtudeList.flatMap((niveauEtude) => getNiveauEtudeApiEures(niveauEtude));
		}

		if (filtre.codePays !== undefined) {
			facetCriteria.push({ facetName: 'LOCATION', facetValues: [filtre.codePays] });
		}
		if (filtre.typeContrat !== undefined && filtre.typeContrat.length > 0) {
			facetCriteria.push({ facetName: 'POSITION_OFFERING', facetValues: filtre.typeContrat });
		}
		if (filtre.tempsDeTravail !== undefined && filtre.tempsDeTravail.length > 0) {
			facetCriteria.push({ facetName: 'POSITION_SCHEDULE', facetValues: filtre.tempsDeTravail });
		}
		if (filtre.niveauEtude !== undefined && filtre.niveauEtude.length > 0) {
			facetCriteria.push({ facetName: 'EDUCATION_LEVEL', facetValues: mapNiveauEtude(filtre.niveauEtude) });
		}
		if (filtre.secteurActivite !== undefined && filtre.secteurActivite.length > 0) {
			facetCriteria.push({ facetName: 'SECTOR', facetValues: filtre.secteurActivite });
		}

		return {
			dataSetRequest: {
				excludedDataSources: [{ dataSourceId: 29 }, { dataSourceId: 81 }, { dataSourceId: 781 }],
				pageNumber: `${filtre.page}`,
				resultsPerPage: `${EMPLOIS_EUROPE_ITEMS_PER_PAGE}`,
				sortBy: 'BEST_MATCH',
			},
			searchCriteria: {
				facetCriteria: facetCriteria,
				keywordCriteria:
					filtre.motCle !== undefined ? {
						keywordLanguageCode: 'fr',
						keywords: [{ keywordScope: 'EVERYWHERE', keywordText: filtre.motCle }],
					} : undefined,
			},
		};
	}

	private async getDetailRecherche(searchResponse: ApiEuresEmploiEuropeRechercheResponse) {
		const body = {
			handle: searchResponse.data.items.map((item) => item.header.handle),
			view: 'FULL_NO_ATTACHMENT',
		};
		const endpoint = '/get';
		const response: { data: ApiEuresEmploiEuropeDetailResponse } = await this.httpClientService.post(endpoint, body);
		return response;
	}

	private findItemByHandle(items: Array<ApiEuresEmploiEuropeDetailItem>, handle: string) {
		return items.find((detail) => detail.jobVacancy.header.handle === handle);
	}

	async get(handle: string): Promise<Either<EmploiEurope>> {
		const endpoint = '/get';
		try {
			const body = {
				handle: [handle],
				view: 'FULL_NO_ATTACHMENT',
			};
			const response: { data: ApiEuresEmploiEuropeDetailResponse } = await this.httpClientService.post(endpoint, body);

			const itemDetail = this.findItemByHandle(response.data.data.items, handle);
			if (!itemDetail) return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);

			const detailOffre = this.apiEuresEmploiEuropeMapper.mapDetailOffre(handle, itemDetail);

			return createSuccess(detailOffre);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Eures',
				contexte: 'get emploi europe',
				message: 'impossible de récupérer le détail d\'une offre d\'emploi',
			});
		}
	}

	async search(filtre: EmploiEuropeFiltre): Promise<Either<ResultatRechercheEmploiEurope>> {
		const endpoint = '/search';
		try {
			const reponseRecherche: { data: ApiEuresEmploiEuropeRechercheResponse } = await this.httpClientService.post(
				endpoint,
				this.buildSearchBody(filtre),
			);
			const reponseDetailRecherche = await this.getDetailRecherche(reponseRecherche.data);
			const mappedResponse = this.apiEuresEmploiEuropeMapper.mapRechercheEmploiEurope(reponseRecherche.data, reponseDetailRecherche.data);
			return createSuccess(mappedResponse);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Eures',
				contexte: 'search emploi europe',
				message: 'impossible d’effectuer une recherche d’emploi',
			});
		}
	}
}
