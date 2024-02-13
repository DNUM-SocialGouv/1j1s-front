import { EntrepriseSouhaitantSEngager } from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager';
import { RejoindreLaMobilisationRepository } from '~/server/entreprises/domain/RejoindreLaMobilisation.repository';
import { ApiLesEntreprisesSEngagentCompany } from '~/server/entreprises/infra/apiLesEntreprisesSEngagentCompany';
import { createSuccess, Either } from '~/server/errors/either';
import { ErrorManagementService, Severity } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

export class ApiRejoindreLaMobilisationRepository implements RejoindreLaMobilisationRepository {
	constructor(
		private readonly httpClientService: PublicHttpClientService,
		private readonly errorManagementService: ErrorManagementService) {
	}

	async save(entreprise: EntrepriseSouhaitantSEngager): Promise<Either<void>> {
		try {
			await this.httpClientService.post('/api/members', this.mapToApiLesEntreprisesSEngagentCompany(entreprise));
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Rejoindre Mobilisation',
				contexte: 'formulaire rejoindre la mobilisation',
				message: 'impossible d’envoyer le formulaire',
				severity: Severity.FATAL,
			});
		}
		return createSuccess(undefined);
	}

	private mapToApiLesEntreprisesSEngagentCompany(entrepriseSouhaitantSEngager: EntrepriseSouhaitantSEngager): ApiLesEntreprisesSEngagentCompany {
		const origine1J1S = 'service-public';
		return {
			companyName: entrepriseSouhaitantSEngager.nomSociété,
			companyPostalCode: entrepriseSouhaitantSEngager.codePostal,
			companySector: entrepriseSouhaitantSEngager.secteur,
			companySiret: entrepriseSouhaitantSEngager.siret,
			companySize: entrepriseSouhaitantSEngager.taille,
			email: entrepriseSouhaitantSEngager.email,
			firstname: entrepriseSouhaitantSEngager.prénom,
			from1j1s: true,
			hasAgreedToCGU: false,
			job: entrepriseSouhaitantSEngager.travail,
			lastname: entrepriseSouhaitantSEngager.nom,
			phone: entrepriseSouhaitantSEngager.téléphone,
			whereDidYouKnowUs: origine1J1S,
		};
	}
}
