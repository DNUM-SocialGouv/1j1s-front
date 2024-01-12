import { createSuccess, Either } from '~/server/errors/either';
import { CacheService } from '~/server/services/cache/cache.service';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

import { MetierStage3eEt2de } from '../../domain/metierStage3eEt2de';
import { MetierStage3eEt2deRepository } from '../../domain/metierStage3eEt2de.repository';
import { ApiPoleEmploiMetierStage3eEt2de } from './apiPoleEmploiMetierStage3eEt2de';
import { mapMetierStage3eEt2de } from './apiPoleEmploiMetierStage3eEt2de.mapper';

export class ApiPoleEmploiMetierStage3eEt2deRepository implements MetierStage3eEt2deRepository {
	constructor(
		private readonly httpClientServiceWithAuthentification: AuthenticatedHttpClientService,
		private readonly cacheService: CacheService,
		private readonly errorManagementService: ErrorManagementService,
	) {}

	private CACHE_KEY = 'REFERENTIEL_METIER_STAGE_3EME';
	private NOMBRE_HEURES_EXPIRATION_CACHE = 24;

	async search(motCle: string): Promise<Either<MetierStage3eEt2de[]>> {
		try {
			let response = await this.cacheService.get<Array<ApiPoleEmploiMetierStage3eEt2de>>(this.CACHE_KEY);
			if (!response) {
				response = (await this.httpClientServiceWithAuthentification.get<Array<ApiPoleEmploiMetierStage3eEt2de>>('/appellations')).data;
				this.cacheService.set(this.CACHE_KEY, response, this.NOMBRE_HEURES_EXPIRATION_CACHE);
			}

			const metiers = response.filter((metier) => metier.libelle.toLowerCase().includes(motCle.toLowerCase()));

			return createSuccess(mapMetierStage3eEt2de(metiers));
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Pole Emploi',
				contexte: 'search appellation metiers stage 3e et 2de',
				message: 'impossible d’effectuer une recherche d’appellation metiers stage 3e et 2de',
			});
		}
	}
}
