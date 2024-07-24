import { EURES_EDUCATION_LEVEL } from '~/client/domain/niveauEtudesEures';
import { LEVEL_CODE, LEVEL_NAME } from '~/server/emplois-europe/infra/langageEures';
import { UNITE_EXPERIENCE_NECESSAIRE } from '~/server/emplois-europe/infra/uniteExperienceNecessaire';

export interface ResultatRechercheEmploiEurope {
	offreList: EmploiEurope[];
	nombreResultats: number;
}

export interface EmploiEurope {
	id: string;
	titre?: string;
	nomEntreprise?: string;
	localisations: Array<{ pays?: string; ville?: string; }>
	typeContrat?: string;
	urlCandidature?: string;
	tempsDeTravail?: string;
	niveauEtudes?: NiveauEtudeAPIEures;
	description?: string;
	listePermis: Array<string>;
	langueDeTravail: Array<string>;
	competencesLinguistiques: Array<CompetenceLinguistique>
	laPlusLongueExperienceNecessaire?: ExperienceNecessaire
	codeLangueDeLOffre?: string
}

export enum NiveauEtudeAPIEures {
	ENSEIGNEMENT_PRESCOLAIRE = '0',
	ENSEIGNEMENT_PRIMAIRE = '1',
	ENSEIGNEMENT_SECONDAIRE_INFERIEUR = '2',
	ENSEIGNEMENT_SECONDAIRE_SUPERIEUR = '3',
	ENSEIGNEMENT_POST_SECONDAIRE_NON_SUPERIEUR = '4',
	ENSEIGNEMENT_SUPERIEUR_CYCLE_COURT = '5',
	NIVEAU_LICENCE_OU_EQUIVALENT = '6',
	NIVEAU_MAITRISE_OU_EQUIVALENT = '7',
	NIVEAU_DOCTORAT_OU_EQUIVALENT = '8',
	AUTRE = '9',
}

export interface ExperienceNecessaire {
	duree: number,
	unite?: UNITE_EXPERIENCE_NECESSAIRE,
}

export interface CompetenceLinguistique {
	codeDuNiveauDeLangue: LEVEL_CODE
	nomDuNiveauDeLangue: LEVEL_NAME
	langage: string
	detailCompetenceLanguistique: Array<LanguageSpecificationCompetence>
}

export interface LanguageSpecificationCompetence {
	codeDuNiveauDeLaCompetence: LEVEL_CODE
	nomDuNiveauDeLaCompetence: LEVEL_NAME
	nomCompetence: string
}

export interface EmploiEuropeFiltre {
	codePays?: string;
	typeContrat?: string[];
	niveauEtude?: Array<EURES_EDUCATION_LEVEL>;
	motCle?: string;
	page: number;
	secteurActivite?: string[]
	tempsDeTravail?: string[]
}
