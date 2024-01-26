export enum EURES_POSITION_SCHEDULE_TYPE {
	FullTime = 'FullTime',
	PartTime = 'PartTime',
	FlexTime = 'FlexTime',
	NonSpecified = 'ns',
	Any = 'Any', // en vérifiant sur l'API Eures, Any ne renvoit jamais rien, toujours d'actualité ?
}

export const tempsDeTravailEures = [
	{
		libellé: 'Temps plein',
		valeur: EURES_POSITION_SCHEDULE_TYPE.FullTime,
	},
	{
		libellé: 'Temps partiel',
		valeur: EURES_POSITION_SCHEDULE_TYPE.PartTime,
	},
	{
		libellé: 'Temps flexible',
		valeur: EURES_POSITION_SCHEDULE_TYPE.FlexTime,
	},
	{
		libellé: 'Tous les types d’horaires',
		valeur: EURES_POSITION_SCHEDULE_TYPE.Any,
	},
	{
		libellé: 'Temps de travail non spécifié',
		valeur: EURES_POSITION_SCHEDULE_TYPE.NonSpecified,
	},
];

