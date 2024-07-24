// TODO (BRUJ 24/07/2024): Le select devrait accepter des valeurs en nombre à supprimer après les travaux sur le select
export enum NiveauDEtude {
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
	AUTRE = 'Autre niveau d’étude',
}

export const niveauDEtudes = [
	{
		libellé: NiveauDEtudesLibelle.SANS_DIPLOME_OU_BREVET,
		valeur: NiveauDEtude.SANS_DIPLOME_OU_BREVET,
	},
	{
		libellé: NiveauDEtudesLibelle.LYCEE_FORMATION_PRO,
		valeur: NiveauDEtude.LYCEE_FORMATION_PRO,
	},
	{
		libellé: NiveauDEtudesLibelle.SUPERIEUR_COURT,
		valeur: NiveauDEtude.SUPERIEUR_COURT,
	},
	{
		libellé:NiveauDEtudesLibelle.LICENCE,
		valeur: NiveauDEtude.LICENCE,
	},
	{
		libellé: NiveauDEtudesLibelle.MASTER,
		valeur: NiveauDEtude.MASTER,
	},
	{
		libellé: NiveauDEtudesLibelle.DOCTORAT,
		valeur: NiveauDEtude.DOCTORAT,
	},
	{
		libellé: NiveauDEtudesLibelle.AUTRE,
		valeur: NiveauDEtude.AUTRE,
	},
];
