// TODO (BRUJ 24/07/2024): Le select devrait accepter des valeurs en nombre à supprimer après les travaux sur le select
export enum NiveauDEtudeValue {
	SANS_DIPLOME_OU_BREVET = '0',
	LYCEE_FORMATION_PRO = '1',
	SUPERIEUR_COURT = '2',
	LICENCE = '3',
	MASTER = '4',
	DOCTORAT = '5',
	AUTRE = '6',
}

export enum NiveauDEtudesLibelle {
	SANS_DIPLOME_OU_BREVET = 'Sans diplôme ou brevet des collèges',
	LYCEE_FORMATION_PRO = 'Lycée / Formation professionnelle',
	SUPERIEUR_COURT = 'Supérieur court (Bac+2 maximum)',
	LICENCE =  'Licence (Bac+3)',
	MASTER = 'Master (Bac+5)',
	DOCTORAT = 'Doctorat (Bac+8)',
	NON_SPECIFIE = 'Niveau d‘études non spécifié',
}

export const niveauDEtudes = [
	{
		libellé: NiveauDEtudesLibelle.SANS_DIPLOME_OU_BREVET,
		valeur: NiveauDEtudeValue.SANS_DIPLOME_OU_BREVET,
	},
	{
		libellé: NiveauDEtudesLibelle.LYCEE_FORMATION_PRO,
		valeur: NiveauDEtudeValue.LYCEE_FORMATION_PRO,
	},
	{
		libellé: NiveauDEtudesLibelle.SUPERIEUR_COURT,
		valeur: NiveauDEtudeValue.SUPERIEUR_COURT,
	},
	{
		libellé:NiveauDEtudesLibelle.LICENCE,
		valeur: NiveauDEtudeValue.LICENCE,
	},
	{
		libellé: NiveauDEtudesLibelle.MASTER,
		valeur: NiveauDEtudeValue.MASTER,
	},
	{
		libellé: NiveauDEtudesLibelle.DOCTORAT,
		valeur: NiveauDEtudeValue.DOCTORAT,
	},
	{
		libellé: NiveauDEtudesLibelle.NON_SPECIFIE,
		valeur: NiveauDEtudeValue.AUTRE,
	},
];
