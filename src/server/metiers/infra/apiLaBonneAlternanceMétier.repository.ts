import { MetierLaBonneAlternanceApiResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { createSuccess, Either } from '~/server/errors/either';
import { Métier } from '~/server/metiers/domain/métier';
import { MétierRepository } from '~/server/metiers/domain/métier.repository';
import { mapMétier } from '~/server/metiers/infra/apiLaBonneAlternanceMétier.mapper';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

export class ApiLaBonneAlternanceMétierRepository implements MétierRepository {
	constructor(private httpClientService: PublicHttpClientService, private loggerService: LoggerService, private errorManagementService: ErrorManagementService) {}

	async getMetierList(recherche: string): Promise<Either<Array<Métier>>> {
		try {
			const response = await this.httpClientService.get<MetierLaBonneAlternanceApiResponse>(`/v1/metiers?title=${recherche}`);
			return createSuccess(mapMétier(response.data));
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'get metier la bonne alternance',
				message: '[API LaBonneAlternance] impossible de récuperer les métiers',
			});
		}
	}
}
