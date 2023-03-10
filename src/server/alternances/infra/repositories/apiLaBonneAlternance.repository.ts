import { Alternance, AlternanceFiltre, RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import {
	mapAlternanceListe,
	mapMatcha, mapPEJob,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createSuccess, Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClientService';

const SOURCES_MATCHA_ET_PEJOBS = 'matcha,offres';

const POLE_EMPLOI_ID_LENGTH = 7;

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
	constructor(private httpClientService: HttpClientService, private caller: string) {}

	async search(filtre: AlternanceFiltre): Promise<Either<Array<RésultatRechercheAlternance>>> {
		try {
			const response = await this.getAlternanceListe(filtre);
			return createSuccess(mapAlternanceListe(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance recherche alternance');
		}
	}

	private async getAlternanceListe(filtre: AlternanceFiltre) {
		const codeRomes = filtre.codeRomes.join(',');
		const endpoint = `/jobs?caller=${this.caller}&romes=${codeRomes}&sources=${SOURCES_MATCHA_ET_PEJOBS}&insee=${filtre.codeCommune}&longitude=${filtre.longitudeCommune}&latitude=${filtre.latitudeCommune}&radius=${filtre.distanceCommune}`;
		return await this.httpClientService.get<AlternanceApiJobsResponse>(endpoint);
	}

	// Les offres Pole Emploi ont un identifiant de 7 caractères (https://pole-emploi.io/data/api/offres-emploi?tabgroup-api=documentation&doc-section=api-doc-section-consulter-une-offre)
	private static isPoleEmploiId(id: string): boolean {
		return id.length === POLE_EMPLOI_ID_LENGTH;
	}

	async get(id: string): Promise<Either<Alternance>> {
		try {
			if (ApiLaBonneAlternanceRepository.isPoleEmploiId(id)) {
				const apiResponse = await this.httpClientService.get<{ peJobs: AlternanceApiJobsResponse.PEJobs[] }>(`/jobs/job/${id}`);
				const offre = apiResponse.data.peJobs[0];
				return createSuccess(mapPEJob(offre));
			}

			const apiResponse = await this.httpClientService.get<{ matchas: AlternanceApiJobsResponse.Matcha[] }>(`/jobs/matcha/${id}`);
			const matcha = apiResponse.data.matchas[0];
			return createSuccess(mapMatcha(matcha));
		} catch (error) {
			return handleSearchFailureError(error, 'détail annonce alternance');
		}
	}
}
