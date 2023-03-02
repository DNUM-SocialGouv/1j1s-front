import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createSuccess, Either } from '~/server/errors/either';
import { Formation, FormationFiltre } from '~/server/formations/domain/formation';
import { FormationRepository } from '~/server/formations/domain/formation.repository';
import { HttpClientService } from '~/server/services/http/httpClientService';

import { ApiLaBonneAlternanceFormationResponse } from './apiLaBonneAlternanceFormation';
import { mapFormation } from './apiLaBonneAlternanceFormation.mapper';

export class ApiLaBonneAlternanceFormationRepository implements FormationRepository {
	constructor(private httpClientService: HttpClientService, private caller: string) {}

	async search(filtre: FormationFiltre): Promise<Either<Array<Formation>>> {
		const codeRomes = filtre.codeRomes.join(',');
		try {
			const endpoint = `/formations?caller=${this.caller}&romes=${codeRomes}&insee=${filtre.codeCommune}&longitude=${filtre.longitudeCommune}&latitude=${filtre.latitudeCommune}&radius=${filtre.distanceCommune}`;
			const response = await this.httpClientService.get<ApiLaBonneAlternanceFormationResponse>(endpoint);
			return createSuccess(mapFormation(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance recherche formation');
		}
	}
}
