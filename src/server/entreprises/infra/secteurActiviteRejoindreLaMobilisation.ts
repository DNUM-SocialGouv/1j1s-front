// Enum
export enum SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM {
	ACCOMMODATION_CATERING = 'accommodation-catering',
	ADMINISTRATIVE_SUPPORT = 'administrative-support',
	AGRICULTURE = 'agriculture',
	CAR_BIKE = 'car-bike',
	CONSTRUCTION = 'construction',
	ENTERTAINMENT = 'entertainment',
	EXTRA_TERRITORIAL = 'extra-territorial',
	FINANCIAL_INSURANCE = 'financial-insurance',
	HEALTH_SOCIAL = 'health-social',
	HOUSEHOLDS_EMPLOYERS = 'households-employers',
	INDUSTRY_EXTRACTION = 'industry-extraction',
	INDUSTRY_MANUFACTURING = 'industry-manufacturing',
	INFORMATION_COMMUNICATION = 'information-communication',
	OTHER = 'other',
	OTHER_SERVICES = 'other-services',
	PRODUCTION_DISTRIBUTION_POWER = 'production-distribution-power',
	PRODUCTION_DISTRIBUTION_WATER = 'production-distribution-water',
	PUBLIC_ADMINISTRATION = 'public-administration',
	PUBLIC_HOSPITAL = 'public-hospistal',
	PUBLIC_TERRITORIAL = 'public-territorial',
	REAL_ESTATE = 'real-estate',
	SCIENTIFIC_TECHNICAL = 'scientific-technical',
	TEACHING = 'teaching',
	TRANSPORT_STORAGE = 'transport-storage',
}

export const secteurActiviteRejoindreLaMobilisation: Array<{libellé: string, valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM }> = [
	{
		libellé: 'Hébergement et restauration',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.ACCOMMODATION_CATERING,
	},
	{
		libellé: 'Activités de services administratifs et de soutien',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.ADMINISTRATIVE_SUPPORT,
	},
	{
		libellé: 'Agriculture, sylviculture et pêche',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.AGRICULTURE,
	},
	{
		libellé: 'Commerce, réparation d‘automobiles et de motocycles',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.CAR_BIKE,
	},
	{
		libellé: 'Construction',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.CONSTRUCTION,
	},
	{
		libellé: 'Arts, spectacles et activités récréatives',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.ENTERTAINMENT,
	},
	{
		libellé: 'Activités extra-territoriales',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.EXTRA_TERRITORIAL,
	},
	{
		libellé: 'Activités financières et d‘assurance',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.FINANCIAL_INSURANCE,
	},
	{
		libellé: 'Santé humaine et action sociale',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.HEALTH_SOCIAL,
	},
	{
		libellé: 'Activités des ménages en tant qu‘employeurs, activités indifférenciées des ménages en tant que producteurs de biens et services pour usage propre',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.HOUSEHOLDS_EMPLOYERS,
	},
	{
		libellé: 'Industries extractives',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.INDUSTRY_EXTRACTION,
	},
	{
		libellé: 'Industrie manufacturière',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.INDUSTRY_MANUFACTURING,
	},
	{
		libellé: 'Information et communication',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.INFORMATION_COMMUNICATION,
	},
	{
		libellé: 'Autre',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.OTHER,
	},
	{
		libellé: 'Autres activités de services',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.OTHER_SERVICES,
	},
	{
		libellé: 'Production et distribution d‘électricité, de gaz, de vapeur et d‘air conditionné',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.PRODUCTION_DISTRIBUTION_POWER,
	},
	{
		libellé: 'Production et distribution d‘eau, assainissement, gestion des déchets et dépollution',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.PRODUCTION_DISTRIBUTION_WATER,
	},
	{
		libellé: 'Administration publique / Fonction publique d‘Etat',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.PUBLIC_ADMINISTRATION,
	},
	{
		libellé: 'Fonction publique hospitalière',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.PUBLIC_HOSPITAL,
	},
	{
		libellé: 'Fonction publique territoriale',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.PUBLIC_TERRITORIAL,
	},
	{
		libellé: 'Activités immobilières',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.REAL_ESTATE,
	},
	{
		libellé: 'Activités spécialisées, scientifiques et techniques',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.SCIENTIFIC_TECHNICAL,
	},
	{
		libellé: 'Enseignement',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.TEACHING,
	},
	{
		libellé: 'Transports et entreposage',
		valeur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.TRANSPORT_STORAGE,
	},
];
