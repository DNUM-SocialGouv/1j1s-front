export enum EURES_CONTRACT_TYPE {
	Apprenticeship = 'Apprenticeship',
	Contract = 'Contract',
	ContractToHire = 'ContractToHire',
	DirectHire = 'DirectHire',
	Internship = 'Internship',
	OnCall = 'OnCall',
	RecruitmentReserve = 'RecruitmentReserve',
	Seasonal = 'Seasonal',
	SelfEmployed = 'SelfEmployed',
	Temporary = 'Temporary',
	TemporaryToHire = 'TemporaryToHire',
	Volunteer = 'Volunteer',
	NS = 'NS',
}

export const typesContratEures = [
	{ libellé: 'Apprentissage', valeur: EURES_CONTRACT_TYPE.Apprenticeship },
	{ libellé: 'Bénévole', valeur: EURES_CONTRACT_TYPE.Volunteer },
	{ libellé: 'Contrat déterminé', valeur: EURES_CONTRACT_TYPE.Contract },
	{ libellé: 'Contrat déterminé pour permanent', valeur: EURES_CONTRACT_TYPE.ContractToHire },
	{ libellé: 'De garde / Sur appel', valeur: EURES_CONTRACT_TYPE.OnCall },
	{ libellé: 'Embauche directe', valeur: EURES_CONTRACT_TYPE.DirectHire },
	{ libellé: 'Indépendant', valeur: EURES_CONTRACT_TYPE.SelfEmployed },
	{ libellé: 'Réserve de recrutement', valeur: EURES_CONTRACT_TYPE.RecruitmentReserve },
	{ libellé: 'Saisonnier', valeur: EURES_CONTRACT_TYPE.Seasonal },
	{ libellé: 'Stage', valeur: EURES_CONTRACT_TYPE.Internship },
	{ libellé: 'Temporaire', valeur: EURES_CONTRACT_TYPE.Temporary },
	{ libellé: 'Temporaire pour permanent', valeur: EURES_CONTRACT_TYPE.TemporaryToHire },
	{ libellé: 'Type de contrat non spécifié', valeur: EURES_CONTRACT_TYPE.NS },
];

