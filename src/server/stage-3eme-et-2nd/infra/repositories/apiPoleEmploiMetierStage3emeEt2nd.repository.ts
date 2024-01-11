import { createSuccess, Either } from '~/server/errors/either';
import { CacheService } from '~/server/services/cache/cache.service';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

import { MetierStage3emeEt2nd } from '../../domain/metierStage3emeEt2nd';
import { MetierStage3emeEt2ndRepository } from '../../domain/metierStage3emeEt2nd.repository';
import { ApiPoleEmploiMetierStage3emeEt2nd } from './apiPoleEmploiMetierStage3emeEt2nd';
import { mapMetierStage3eme } from './apiPoleEmploiMetierStage3emeEt2nd.mapper';

export class ApiPoleEmploiMetierStage3emeEt2ndRepository implements MetierStage3emeEt2ndRepository {
	constructor(
		private readonly httpClientServiceWithAuthentification: AuthenticatedHttpClientService,
		private readonly cacheService: CacheService,
		private readonly errorManagementService: ErrorManagementService,
	) {}

	private CACHE_KEY = 'REFERENTIEL_METIER_STAGE_3EME';
	private NOMBRE_HEURES_EXPIRATION_CACHE = 24;

	async search(motCle: string): Promise<Either<MetierStage3emeEt2nd[]>> {
		try {
			let response = await this.cacheService.get<Array<ApiPoleEmploiMetierStage3emeEt2nd>>(this.CACHE_KEY);
			if (!response) {
				response = (await this.httpClientServiceWithAuthentification.get<Array<ApiPoleEmploiMetierStage3emeEt2nd>>('/appellations')).data;
				this.cacheService.set(this.CACHE_KEY, response, this.NOMBRE_HEURES_EXPIRATION_CACHE);
			}

			const metiers = response.filter((metier) => metier.libelle.toLowerCase().includes(motCle.toLowerCase()));

			return createSuccess(mapMetierStage3eme(metiers));
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Pole Emploi',
				contexte: 'search appellation metiers stage 3eme et 2nd',
				message: 'impossible d’effectuer une recherche d’appellation metiers stage 3eme et 2nd',
			});
		}
	}
}
