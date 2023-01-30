import { Domaines } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';

import { HttpClientService } from '../httpClient.service';

export interface OffreDeStageFormulaireNotFormatted extends Record<string, unknown> {
	emailEmployeur: string;
	adresse: string;
	lienCandidature: string;
	nomOffre: string;
	teletravail?: string;
	remunerationStage?: number;
	ville: string;
	region?: string;
	pays: string;
	departement?: string;
	codePostal: string;
	siteEmployeur?: string;
	nomEmployeur: string;
	logoEmployeur: string;
	descriptionEmployeur: string;
	dureeStage: string;
	domaineStage?: Domaines;
	descriptionOffre: string;
	dateDebut: string;
}

export interface OffreDeStageFormulaire extends Record<string, unknown> {
	emailEmployeur: string;
	adresse: string;
	lienCandidature: string;
	nomOffre: string;
	teletravail?: boolean;
	remunerationStage?: number;
	ville: string;
	region?: string;
	pays: string;
	departement?: string;
	codePostal: string;
	siteEmployeur?: string;
	nomEmployeur: string;
	logoEmployeur: string;
	descriptionEmployeur: string;
	dureeStage: string;
	domaineStage?: Domaines;
	descriptionOffre: string;
	dateDebut: string;
}

export class StageService {

	constructor(private httpClientService: HttpClientService) {}

	async enregistrerOffreDeStage(offre: OffreDeStageFormulaire): Promise<Either<void>> {
		return this.httpClientService.post('stages', offre);
	};
}
