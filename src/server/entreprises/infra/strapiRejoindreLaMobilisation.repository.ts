import { handleGetFailureError } from '~/server/entreprises/infra/apiRejoindreLaMobilisationError';
import { createSuccess, Either } from '~/server/errors/either';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

import { Entreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class StrapiRejoindreLaMobilisationRepository implements RejoindreLaMobilisationRepository {

	constructor(private httpClientService: AuthenticatedHttpClientService, private loggerService: LoggerService) {
	}
	async save(entreprise: Entreprise, annotation?: string): Promise<Either<void>> {
		try {
			await this.httpClientService.post('entreprises', {
				data: {
					code_postal: entreprise.codePostal,
					email: entreprise.email,
					nom: entreprise.nom,
					nom_societe: entreprise.nomSociété,
					prenom: entreprise.prénom,
					secteur: entreprise.secteur,
					siret: entreprise.siret,
					taille: entreprise.taille,
					telephone: entreprise.téléphone,
					travail: entreprise.travail,
					ville: entreprise.ville,
					...(annotation ? { erreur: annotation } : {}),
				},
			});
		} catch (e) {
			return handleGetFailureError(e, 'strapi rejoindre mobilisation', this.loggerService);
		}
		return createSuccess(undefined);
	}
}
