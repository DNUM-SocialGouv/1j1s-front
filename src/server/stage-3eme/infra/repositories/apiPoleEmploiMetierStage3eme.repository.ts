import { createSuccess, Either } from '~/server/errors/either';
import { CacheService } from '~/server/services/cache/cache.service';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

import { MetierStage3eme } from '../../domain/metierStage3eme';
import { MetierStage3emeRepository } from '../../domain/metierStage3eme.repository';
import { ApiPoleEmploiMetierStage3eme } from './apiPoleEmploiMetierStage3eme';
import { mapMetierStage3eme } from './apiPoleEmploiMetierStage3eme.mapper';

export class ApiPoleEmploiMetierStage3emeRepository implements MetierStage3emeRepository {
	constructor(
		private readonly httpClientServiceWithAuthentification: AuthenticatedHttpClientService,
		private readonly cacheService: CacheService,
		private readonly errorManagementService: ErrorManagementService,
	) {}

	private CACHE_KEY = 'REFERENTIEL_METIER_STAGE_3EME';
	private NOMBRE_HEURES_EXPIRATION_CACHE = 24;

	async search(motCle: string): Promise<Either<MetierStage3eme[]>> {
		try {
			let response = await this.cacheService.get<Array<ApiPoleEmploiMetierStage3eme>>(this.CACHE_KEY);
			if (!response) {
				response = (await this.httpClientServiceWithAuthentification.get<Array<ApiPoleEmploiMetierStage3eme>>('/appellations')).data;
				this.cacheService.set(this.CACHE_KEY, response, this.NOMBRE_HEURES_EXPIRATION_CACHE);
			}

			const metiers = response.filter((metier) => metier.libelle.toLowerCase().includes(motCle.toLowerCase()));

			return createSuccess(mapMetierStage3eme(metiers));
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Pole Emploi',
				contexte: 'search appellation metiers stage 3eme',
				message: 'impossible d’effectuer une recherche d’appellation metiers stage 3eme',
			});
		}
	}
}
