import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { Statistique } from '~/server/formations/domain/statistique';
import { StatistiqueRepository } from '~/server/formations/domain/statistique.repository';
import {
	ApiTrajectoiresProStatistiqueResponse,
	StatistiqueAvecRegionEtAuMoinsUnPourcentage,
	StatistiquesMappedFromApi,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique';
import { mapStatistiques } from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.mapper';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

export class ApiTrajectoiresProStatistiqueRepository implements StatistiqueRepository {
	constructor(private readonly httpClientService: PublicHttpClientService, private readonly apiGeoLocalisationRepository: LocalisationRepository, private readonly errorManagementService: ErrorManagementService) {}

	async get(codeCertification: string, codePostal: string): Promise<Either<Statistique>> {
		try {
			const codeRegionOrFailure = await this.apiGeoLocalisationRepository.getCodeRegionByCodePostal(codePostal);
			if (isFailure(codeRegionOrFailure)) {
				return codeRegionOrFailure;
			}

			const { data } = await this.httpClientService.get<ApiTrajectoiresProStatistiqueResponse>(
				`inserjeunes/regionales/${codeRegionOrFailure.result}/certifications/${codeCertification}`,
			);
			const statistiques = mapStatistiques(data);
			if (ApiTrajectoiresProStatistiqueRepository.isRegionEtAuMoinsUnPourcentageDisponible(statistiques)) {
				return createSuccess(statistiques);
			}

			const incompleteStatistiqueError = new Error(JSON.stringify(statistiques));
			return this.errorManagementService.handleFailureError(incompleteStatistiqueError, {
				apiSource: 'API Trajectoires Pro',
				contexte: 'get statistique de formation',
				message: 'statistique de formation trouvée mais incomplète',
			});
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Trajectoires Pro',
				contexte: 'get statistique de formation',
				message: 'statistique de formation non trouvée',
			});
		}
	}

	private static isRegionEtAuMoinsUnPourcentageDisponible(statistiquesMappedFromApi: StatistiquesMappedFromApi): statistiquesMappedFromApi is StatistiqueAvecRegionEtAuMoinsUnPourcentage {
		const isRegionStatistiqueDisponible = !!statistiquesMappedFromApi.region;
		const isStatistiqueDisponible = !!statistiquesMappedFromApi.tauxEnEmploi6Mois || !!statistiquesMappedFromApi.tauxEnFormation || !!statistiquesMappedFromApi.tauxAutres6Mois;
		return isRegionStatistiqueDisponible && isStatistiqueDisponible;
	}

}
