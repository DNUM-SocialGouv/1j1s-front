import { createSuccess, Either, isFailure, isSuccess } from '~/server/errors/either';
import { Statistique } from '~/server/formations/domain/statistique';
import { StatistiqueRepository } from '~/server/formations/domain/statistique.repository';
import {
	ApiTrajectoiresProStatistiqueResponse,
	StatistiqueAvecRegionEtAuMoinsUnPourcentage,
	StatistiquesMappedFromApi,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique';
import { mapStatistiques } from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.mapper';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
	LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import { ErrorManagementService, Severity } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

export class ApiTrajectoiresProStatistiqueRepository implements StatistiqueRepository {
	constructor(
		private readonly httpClientService: AuthenticatedHttpClientService,
		private readonly apiGeoLocalisationRepository: LocalisationRepository,
		private readonly apiAdresseRepository: LocalisationAvecCoordonnéesRepository,
		private readonly errorManagementService: ErrorManagementService,
	) {}

	private async getCodeRegion(codePostal: string): Promise<Either<string | undefined>> {
		const codeRegionFromCodePostal = await this.apiGeoLocalisationRepository.getCodeRegionByCodePostal(codePostal);
		if (isSuccess(codeRegionFromCodePostal)) {
			return codeRegionFromCodePostal;
		}

		const communeFromCodePostal = await this.apiAdresseRepository.getCommuneList(codePostal);
		if (isFailure(communeFromCodePostal)) {
			return communeFromCodePostal;
		}
		const { longitude, latitude } = communeFromCodePostal.result.résultats[0].coordonnées;
		const codePostalFromLongitudeLatitude = await this.apiAdresseRepository.getCommuneListByLongitudeLatitude(longitude, latitude);
		if (isFailure(codePostalFromLongitudeLatitude)) {
			return codePostalFromLongitudeLatitude;
		}
		return this.apiGeoLocalisationRepository.getCodeRegionByCodePostal(codePostalFromLongitudeLatitude.result.résultats[0].codePostal);
	}

	async get(codeCertification: string, codePostal: string): Promise<Either<Statistique>> {
		try {
			const codeRegionOrFailure = await this.getCodeRegion(codePostal);
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
				severity: Severity.WARNING,
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
