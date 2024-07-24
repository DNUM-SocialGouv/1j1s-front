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

export const niveauEtudesEures = [
	{
		libellé: 'Sans diplôme ou brevet des collèges',
		valeur: NiveauDEtude.SANS_DIPLOME_OU_BREVET,
	},
	{
		libellé: 'Lycée / Formation professionnelle',
		valeur: NiveauDEtude.LYCEE_FORMATION_PRO,
	},
	{
		libellé: 'Supérieur court (Bac+2 maximum)',
		valeur: NiveauDEtude.SUPERIEUR_COURT,
	},
	{
		libellé: 'Licence (Bac+3)',
		valeur: NiveauDEtude.LICENCE,
	},
	{
		libellé: 'Master (Bac+5)',
		valeur: NiveauDEtude.MASTER,
	},
	{
		libellé: 'Doctorat (Bac+8)',
		valeur: NiveauDEtude.DOCTORAT,
	},
	{
		libellé: 'Autre niveau d’étude',
		valeur: NiveauDEtude.AUTRE,
	},
];
