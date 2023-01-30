import { Domaines } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';

import { HttpClientService } from '../httpClient.service';

export interface OffreDeStageFormulaire {
	adresse?: string;
	urlDeCandidature: string;
	titre: string;
	teletravail?: boolean;
	remunerationStage?: number;
	ville: string;
	region?: string;
	pays: string;
	departement?: string;
	codePostal?: string;
	siteEmployeur?: string;
	nomEmployeur?: string;
	logoEmployeur?: string;
	descriptionEmployeur: string;
	duree: string;
	domaine: Domaines;
	descriptionOffre: string;
	dateDeDebut: string;
}

export class StageService {

	constructor(private httpClientService: HttpClientService) {}

	async enregistrerOffreDeStage(offre: OffreDeStageFormulaire): Promise<Either<void>> {
		return this.httpClientService.post('stages', offre);
	};
}
