import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createFailure, createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Statistique } from '~/server/formations/domain/statistique';
import { StatistiqueRepository } from '~/server/formations/domain/statistique.repository';
import { ApiTrajectoiresProStatistiqueResponse } from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique';
import { mapStatistique } from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.mapper';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { HttpClientService } from '~/server/services/http/httpClientService';

export class ApiTrajectoiresProStatistiqueRepository implements StatistiqueRepository {
	constructor(private httpClientService: HttpClientService, private apiGeoLocalisationRepository: ApiGeoLocalisationRepository) {}

	async get(codeCertification: string, codePostal: string): Promise<Either<Statistique>> {
		try {
			const codeRegion = await this.apiGeoLocalisationRepository.getCodeRegionByCodePostal(codePostal);
			if (isFailure(codeRegion) || !codeRegion.result) {
				return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
			}

			const { data } = await this.httpClientService.get<ApiTrajectoiresProStatistiqueResponse>(
				`inserjeunes/regionales/${codeRegion.result}/certifications/${codeCertification}`,
			);
			if (!this.isRegionEtAuMoinsUnPourcentageDisponible(data)) return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
			const statistique = mapStatistique(data);
			return createSuccess(statistique);
		} catch (e) {
			return handleSearchFailureError(e, 'statistique formation');
		}
	}

	private isRegionEtAuMoinsUnPourcentageDisponible(data: ApiTrajectoiresProStatistiqueResponse): boolean {
		const isRegionStatistiqueDisponible = !!data.region?.nom;
		const isStatistiqueDisponible = !!data.taux_autres_6_mois || !!data.taux_en_emploi_6_mois || !!data.taux_autres_6_mois;
		return isRegionStatistiqueDisponible && isStatistiqueDisponible;
	}
}
