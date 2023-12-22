import { EntrepriseSouhaitantSEngager } from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager';
import { RejoindreLaMobilisationRepository } from '~/server/entreprises/domain/RejoindreLaMobilisation.repository';
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
			await this.httpClientService.post('/api/members', this.mapEntreprise(entreprise));
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

	private mapEntreprise(e: EntrepriseSouhaitantSEngager) {
		return {
			companyName: e.nomSociété,
			companyPostalCode: e.codePostal,
			companySector: e.secteur,
			companySiret: e.siret,
			companySize: e.taille,
			email: e.email,
			firstname: e.prénom,
			from1j1s: true,
			job: e.travail,
			lastname: e.nom,
			phone: e.téléphone,
		};
	}
}
