// TODO (BRUJ 24/07/2024): Le select devrait accepter des valeurs en nombre à supprimer après les travaux sur le select
export enum EURES_EDUCATION_LEVEL {
	SANS_DIPLOME_OU_BREVET = '0',
	LYCEE_FORMATION_PRO = '1',
	SUPERIEUR_COURT = '2',
	LICENSE = '3',
	MASTER = '4',
	DOCTORAT = '5',
	AUTRE = '6',
}

export const niveauEtudesEures = [
	{
		libellé: 'Sans diplôme ou brevet des collèges',
		valeur: EURES_EDUCATION_LEVEL.SANS_DIPLOME_OU_BREVET,
	},
	{
		libellé: 'Lycée / Formation professionnelle',
		valeur: EURES_EDUCATION_LEVEL.LYCEE_FORMATION_PRO,
	},
	{
		libellé: 'Supérieur court (Bac+2 maximum)',
		valeur: EURES_EDUCATION_LEVEL.SUPERIEUR_COURT,
	},
	{
		libellé: 'Licence (Bac+3)',
		valeur: EURES_EDUCATION_LEVEL.LICENSE,
	},
	{
		libellé: 'Master (Bac+5)',
		valeur: EURES_EDUCATION_LEVEL.MASTER,
	},
	{
		libellé: 'Doctorat (Bac+8)',
		valeur: EURES_EDUCATION_LEVEL.DOCTORAT,
	},
	{
		libellé: 'Autre niveau d’étude',
		valeur: EURES_EDUCATION_LEVEL.AUTRE,
	},
];
