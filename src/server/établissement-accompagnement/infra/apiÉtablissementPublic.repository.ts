import { createSuccess, Either } from '~/server/errors/either';
import {
	ÉtablissementAccompagnement,
	ParamètresRechercheÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';
import {
	ÉtablissementAccompagnementRepository,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.repository';
import {
	mapÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.mapper';
import {
	RésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.response';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

export class ApiÉtablissementPublicRepository implements ÉtablissementAccompagnementRepository {
	constructor(private readonly httpClient: PublicHttpClientService, private readonly errorManagement: ErrorManagementService) {
	}

	async search(params: ParamètresRechercheÉtablissementAccompagnement): Promise<Either<ÉtablissementAccompagnement[]>> {
		const { commune, typeAccompagnement } = params;
		try {
			const { data } = await this.httpClient.get<RésultatRechercheÉtablissementPublicResponse>(`communes/${commune}/${typeAccompagnement}`);
			return createSuccess(mapÉtablissementAccompagnement(data));
		} catch (error) {
			return this.errorManagement.handleFailureError(error, {
				apiSource: 'API Établissement Public',
				contexte: 'search établissement public',
				message: '[API Établissement Public] Impossible d‘effectuer la recherche d‘Établissement Public',
			});
		}
	}
}
