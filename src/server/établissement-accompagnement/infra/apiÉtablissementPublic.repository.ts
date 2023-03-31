import axios from 'axios';

import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import {
	mapÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.mapper';
import {
	RésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.response';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

interface SearchÉtablissementPublic {
  commune: string
  typeAccompagnement: string
}

export class ApiÉtablissementPublicRepository {
	constructor(private httpClient: PublicHttpClientService) {
	}

	async search(params: SearchÉtablissementPublic): Promise<Either<ÉtablissementAccompagnement[]>> {
		const { commune, typeAccompagnement } = params;
		try {
			const { data } = await this.httpClient.get<RésultatRechercheÉtablissementPublicResponse>(`communes/${commune}/${typeAccompagnement}`);
			return createSuccess(mapÉtablissementAccompagnement(data));
		} catch (e) {
			LoggerService.error('[API Établissement Public] Erreur lors de la recherche d‘Établissement Public');
			if (axios.isAxiosError(e)) {
				if (e.response?.status === 404) {
					return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
				}
			}
			return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
		}
	}
}
