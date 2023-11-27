export enum EURES_POSITION_SCHEDULE_TYPE {
	FullTime = 'FullTime',
	PartTime = 'PartTime',
	FlexTime = 'FlexTime',
	Any = 'Any',
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

];

