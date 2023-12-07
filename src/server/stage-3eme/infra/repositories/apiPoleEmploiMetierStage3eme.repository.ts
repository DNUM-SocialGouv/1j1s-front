import { CacheService } from '~/server/services/cache/cache.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

import { createFailure, createSuccess, Either } from '../../../errors/either';
import { ErreurMetier } from '../../../errors/erreurMetier.types';
import { ErrorManagementService } from '../../../services/error/errorManagement.service';
import { MetierStage3eme } from '../../domain/metierStage3eme';
import { ApiPoleEmploiMetierStage3eme } from './apiPoleEmploiMetierStage3eme';
import { mapMetierStage3eme } from './apiPoleEmploiMetierStage3eme.mapper';

class ApiPoleEmploiMetierStage3emeRepository {
	constructor(
		private readonly httpClientServiceWithAuthentification: AuthenticatedHttpClientService,
		private readonly cacheService: CacheService,
		private readonly errorManagementService: ErrorManagementService,
	) {}

	private CACHE_KEY = 'REFERENTIEL_METIER_STAGE_3EME';

	async searchMetier(motCle: string): Promise<Either<MetierStage3eme>> {
		try {
			let response = await this.cacheService.get<Array<ApiPoleEmploiMetierStage3eme>>(this.CACHE_KEY);
			if (!response) {
				response = (await this.httpClientServiceWithAuthentification.get<Array<ApiPoleEmploiMetierStage3eme>>(`/appellations/${motCle}`)).data;
				this.cacheService.set(this.CACHE_KEY, response, 24);
			}

			const metier = response.find((metier) => metier.libelle.toLowerCase().includes(motCle.toLowerCase()));
			if (!metier) {
				return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
			}

			return createSuccess(mapMetierStage3eme(metier));
		} catch(error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Immersion Facile Stage 3eme',
				contexte: 'search stage 3eme',
				message: 'impossible d’effectuer une recherche de stage 3eme',
			});
		}
	}
}
