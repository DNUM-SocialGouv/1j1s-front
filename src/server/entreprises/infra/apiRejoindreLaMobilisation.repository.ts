import { createSuccess, Either } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

import { Entreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class ApiRejoindreLaMobilisationRepository implements RejoindreLaMobilisationRepository {
	constructor(
		private readonly httpClientService: PublicHttpClientService,
		private readonly errorManagementService: ErrorManagementService) {
	}

	async save(entreprise: Entreprise): Promise<Either<void>> {
		try {
			await this.httpClientService.post('/api/members', this.mapEntreprise(entreprise));
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Rejoindre Mobilisation',
				contexte: 'formulaire rejoindre la mobilisation',
				message: '[API Rejoindre Mobilisation] Erreur inconnue - Insertion formulaire',
			});
		}
		return createSuccess(undefined);
	}

	private mapEntreprise(e: Entreprise) {
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
