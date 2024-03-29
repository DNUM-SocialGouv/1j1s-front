export enum SecteurActiviteCode {
	ACCOMMODATION= 'I',
	ADMINISTRATIVE= 'N',
	AGRICULTURE= 'A',
	ARTS= 'R',
	CONSTRUCTION= 'F',
	EDUCATION= 'P',
	ELECTRICITY= 'D',
	EXTRATERRITORIAL= 'U',
	FINANCIAL= 'K',
	HEALTH= 'Q',
	HOUSEHOLDS= 'T',
	INFORMATION= 'J',
	MANUFACTURING= 'C',
	MINING= 'B',
	OTHER_SERVICES= 'S',
	PROFESSIONAL= 'M',
	PUBLIC_ADMINISTRATION= 'O',
	REAL_ESTATE= 'L',
	RETAIL_TRADE= 'G',
	TRANSPORT= 'H',
	WATER_SUPPLY= 'E',
}

export const secteurActiviteEures = [
	{ libellé: 'Hébergement et restauration', valeur: SecteurActiviteCode.ACCOMMODATION },
	{ libellé: 'Activités administratives et de soutien', valeur: SecteurActiviteCode.ADMINISTRATIVE },
	{ libellé: 'Agriculture, sylviculture et pêche', valeur: SecteurActiviteCode.AGRICULTURE },
	{ libellé: 'Arts, spectacles et loisirs', valeur: SecteurActiviteCode.ARTS },
	{ libellé: 'Construction', valeur: SecteurActiviteCode.CONSTRUCTION },
	{ libellé: 'Éducation', valeur: SecteurActiviteCode.EDUCATION },
	{ libellé: 'Production et distribution d‘électricité, de gaz, de vapeur et d‘air conditionné', valeur: SecteurActiviteCode.ELECTRICITY },
	{ libellé: 'Activités des organisations et organismes extraterritoriaux', valeur: SecteurActiviteCode.EXTRATERRITORIAL },
	{ libellé: 'Activités financières et d‘assurance', valeur: SecteurActiviteCode.FINANCIAL },
	{ libellé: 'Activités de santé humaine et d‘action sociale', valeur: SecteurActiviteCode.HEALTH },
	{ libellé: 'Activités des ménages en tant qu‘employeurs; activités indifférenciées de production de biens et de services pour usage propre des ménages', valeur: SecteurActiviteCode.HOUSEHOLDS },
	{ libellé: 'Information et communication', valeur: SecteurActiviteCode.INFORMATION },
	{ libellé: 'Industrie manufacturière', valeur: SecteurActiviteCode.MANUFACTURING },
	{ libellé: 'Extraction minière et exploitation en carrière', valeur: SecteurActiviteCode.MINING },
	{ libellé: 'Autres activités de services', valeur: SecteurActiviteCode.OTHER_SERVICES },
	{ libellé: 'Activités professionnelles, scientifiques et techniques', valeur: SecteurActiviteCode.PROFESSIONAL },
	{ libellé: 'Administration publique et défense; sécurité sociale obligatoire', valeur: SecteurActiviteCode.PUBLIC_ADMINISTRATION },
	{ libellé: 'Activités immobilières', valeur: SecteurActiviteCode.REAL_ESTATE },
	{ libellé: 'Commerce de gros et de détail; réparation de véhicules automobiles et de motocycles', valeur: SecteurActiviteCode.RETAIL_TRADE },
	{ libellé: 'Transport et entreposage', valeur: SecteurActiviteCode.TRANSPORT },
	{ libellé: 'Captage, traitement et distribution d‘eau; assainissement, gestion des déchets et dépollution', valeur: SecteurActiviteCode.WATER_SUPPLY },
];
