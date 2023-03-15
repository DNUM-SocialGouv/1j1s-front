import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createFailure, createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Certification } from '~/server/formations/domain/certification';
import { CertificationRepository } from '~/server/formations/domain/certification.repository';
import { ApiTrajectoiresProCertificationResponse } from '~/server/formations/infra/repositories/apiTrajectoiresProCertification';
import { mapCertification } from '~/server/formations/infra/repositories/apiTrajectoiresProCertification.mapper';
import { ApiGeoLocalisationRepository } from '~/server/localisations/infra/repositories/apiGeoLocalisation.repository';
import { HttpClientService } from '~/server/services/http/httpClientService';

export class ApiTrajectoiresProCertificationRepository implements CertificationRepository {
	constructor(private httpClientService: HttpClientService, private apiGeoLocalisationRepository: ApiGeoLocalisationRepository) {}

	async get(codeCertification: string, codePostal: string): Promise<Either<Certification>> {
		try {
			const codeRegion = await this.apiGeoLocalisationRepository.getCodeRegionByCodePostal(codePostal);
			if (isFailure(codeRegion)) {
				return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
			}

			const apiResponse = await this.httpClientService.get<ApiTrajectoiresProCertificationResponse>(
				`inserjeunes/regionales/${codeRegion.result}/certifications/${codeCertification}`,
			);
			const certification = mapCertification(apiResponse.data);
			return createSuccess(certification);
		} catch (e) {
			return handleSearchFailureError(e, 'certification');
		}
	}
}
