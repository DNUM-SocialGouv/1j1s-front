import { NiveauDEtudesLibelle,NiveauDEtudeValue } from '~/server/emplois-europe/domain/niveauDEtudes';
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
	niveauEtudes?: NiveauDEtudesLibelle;
	description?: string;
	listePermis: Array<string>;
	langueDeTravail: Array<string>;
	competencesLinguistiques: Array<CompetenceLinguistique>
	laPlusLongueExperienceNecessaire?: ExperienceNecessaire
	codeLangueDeLOffre?: string
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
	niveauEtude?: Array<NiveauDEtudeValue>;
	motCle?: string;
	page: number;
	secteurActivite?: string[]
	tempsDeTravail?: string[]
}
