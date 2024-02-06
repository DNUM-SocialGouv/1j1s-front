// s‘ordre des valeurs de cet objet est plus important que s‘ordre de ses clés.
/* eslint-disable sort-keys-fix/sort-keys-fix */
export const TailleDEntreprise = {
	xxsmall: '0 à 19 salariés',
	xsmall: '20 à 49 salariés',
	small: '50 à 99 salariés',
	medium: '100 à 249 salariés',
	large: '250 à 499 salariés',
	xlarge: '500 à 999 salariés',
	xxlarge: '1000 à 5000 salariés',
	huge: 'Plus de 5000 salariés',
};

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

export interface EntrepriseSouhaitantSEngager {
  nomSociété: string;
  codePostal: string;
  ville: string;
  siret: string;
  secteur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM;
  taille: keyof typeof TailleDEntreprise;
  prénom: string;
  nom: string;
  email: string;
  travail: string;
  téléphone: string;
}
