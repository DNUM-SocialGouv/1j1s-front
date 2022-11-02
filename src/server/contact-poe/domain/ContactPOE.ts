export const SecteurDActivité = {
  'accommodation-catering': 'Hébergement et restauration',
  'administrative-support': 'Activités de services administratifs et de soutien',
  agriculture: 'Agriculture, sylviculture et pêche',
  'car-bike': 'Commerce, réparation d\'automobiles et de motocycles',
  construction: 'Construction',
  entertainment: 'Arts, spectacles et activités récréatives',
  'extra-territorial': 'Activités extra-territoriales',
  'financial-insurance': 'Activités financières et d\'assurance',
  'health-social': 'Santé humaine et action sociale',
  'households-employers': 'Activités des ménages en tant qu\'employeurs, activités indifférenciées des ménages en tant que producteurs de biens et services pour usage propre',
  'industry-extraction': 'Industries extractives',
  'industry-manufacturing': 'Industrie manufacturière',
  'information-communication': 'Information et communication',
  other: 'Autre',
  'other-services': 'Autres activités de services',
  'production-distribution-power': 'Production et distribution d\'électricité, de gaz, de vapeur et d\'air conditionné',
  'production-distribution-water': 'Production et distribution d\'eau, assainissement, gestion des déchets et dépollution',
  'public-administration': 'Administration publique / Fonction publique d\'Etat',
  'public-hospistal': 'Fonction publique hospitalière',
  'public-territorial': 'Fonction publique territoriale',
  'real-estate': 'Activités immobilières',
  'scientific-technical': 'Activités spécialisées, scientifiques et techniques',
  teaching: 'Enseignement',
  'transport-storage': 'Transports et entreposage',
};

// l'ordre des valeurs de cet objet est plus important que l'ordre de ses clés.
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

export interface ContactPOE {
  nomSociété: string;
  codePostal: string;
  ville: string;
  siret: string;
  secteur: keyof typeof SecteurDActivité;
  taille: keyof typeof TailleDEntreprise;
  nom: string;
  prénom: string;
  téléphone: string;
  email: string;
  travail: string;
  nbRecrutement: string;
  commentaire: string;
}
