import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createFailure, createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Statistique } from '~/server/formations/domain/statistique';
import { StatistiqueRepository } from '~/server/formations/domain/statistique.repository';
import {
	ApiTrajectoiresProStatistiqueResponse,
	isRegionEtAuMoinsUnPourcentageDisponible,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique';
import { mapStatistiques } from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.mapper';
import { ApiGeoRepository } from '~/server/localisations/infra/repositories/apiGeo.repository';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

export class ApiTrajectoiresProStatistiqueRepository implements StatistiqueRepository {
	constructor(private httpClientService: PublicHttpClientService, private apiGeoLocalisationRepository: ApiGeoRepository) {}

	async get(codeCertification: string, codePostal: string): Promise<Either<Statistique>> {
		try {
			const codeRegion = await this.apiGeoLocalisationRepository.getCodeRegionByCodePostal(codePostal);
			if (isFailure(codeRegion) || !codeRegion.result) {
				return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
			}

			const { data } = await this.httpClientService.get<ApiTrajectoiresProStatistiqueResponse>(
				`inserjeunes/regionales/${codeRegion.result}/certifications/${codeCertification}`,
			);
			const statistiques = mapStatistiques(data);
			if (isRegionEtAuMoinsUnPourcentageDisponible(statistiques)) return createSuccess(statistiques);
			return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
		} catch (e) {
			return handleSearchFailureError(e, 'statistique formation');
		}
	}

}
