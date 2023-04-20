import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createSuccess, Either } from '~/server/errors/either';
import { Métier } from '~/server/metiers/domain/métier';
import { MétierRepository } from '~/server/metiers/domain/métier.repository';
import { mapMétier } from '~/server/metiers/infra/apiLaBonneAlternanceMétier.mapper';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

export class ApiLaBonneAlternanceMétierRepository implements MétierRepository {
	constructor(private httpClientService: PublicHttpClientService, private loggerService: LoggerService) {}

	async getMetierList(recherche: string): Promise<Either<Array<Métier>>> {
		try {
			const response = await this.httpClientService.get<MetierLaBonneAlternanceApiResponse>(`/v1/metiers?title=${recherche}`);
			return createSuccess(mapMétier(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance métier', this.loggerService);
		}
	}
}
