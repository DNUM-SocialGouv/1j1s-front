export enum EURES_EDUCATION_LEVEL_CODES_TYPE {
	ENSEIGNEMENT_PRESCOLAIRE = 0,
	ENSEIGNEMENT_PRIMAIRE = 1,
	ENSEIGNEMENT_SECONDAIRE_INFERIEUR = 2,
	ENSEIGNEMENT_SECONDAIRE_SUPERIEUR = 3,
	ENSEIGNEMENT_POST_SECONDAIRE_NON_SUPERIEUR = 4,
	ENSEIGNEMENT_SUPERIEUR_CYCLE_COURT = 5,
	NIVEAU_LICENCE_OU_EQUIVALENT = 6,
	NIVEAU_MAITRISE_OU_EQUIVALENT = 7,
	NIVEAU_DOCTORAT_OU_EQUIVALENT = 8,
	AUTRE = 9,
}

export type NiveauEtudes = (typeof niveauEtudesEures)[number]['libellé']
export const niveauEtudesEures = [
	{
		libellé: 'Enseignement préscolaire',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.ENSEIGNEMENT_PRESCOLAIRE.toString(),
	},
	{
		libellé: 'Enseignement primaire',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.ENSEIGNEMENT_PRIMAIRE.toString(),
	},
	{
		libellé: 'Enseignement secondaire inférieur',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.ENSEIGNEMENT_SECONDAIRE_INFERIEUR.toString(),
	},
	{
		libellé: 'Enseignement secondaire supérieur',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.ENSEIGNEMENT_SECONDAIRE_SUPERIEUR.toString(),
	},
	{
		libellé: 'Enseignement post-secondaire non supérieur',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.ENSEIGNEMENT_POST_SECONDAIRE_NON_SUPERIEUR.toString(),
	},
	{
		libellé: 'Enseignement supérieur de cycle court',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.ENSEIGNEMENT_SUPERIEUR_CYCLE_COURT.toString(),
	},
	{
		libellé: 'Niveau licence (Bachelor) ou équivalent',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.NIVEAU_LICENCE_OU_EQUIVALENT.toString(),
	},
	{
		libellé: 'Niveau maîtrise (Master) ou équivalent',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.NIVEAU_MAITRISE_OU_EQUIVALENT.toString(),
	},
	{
		libellé: 'Niveau doctorat ou équivalent',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.NIVEAU_DOCTORAT_OU_EQUIVALENT.toString(),
	},
	{
		libellé: 'Autre niveau d’étude',
		valeur: EURES_EDUCATION_LEVEL_CODES_TYPE.AUTRE.toString(),
	},
];
