export namespace ApiTrajectoiresProCertificationResponse {
	export interface Region {
		code?: string
		nom?: string
	}
}

export interface ApiTrajectoiresProCertificationResponse {
	region?: ApiTrajectoiresProCertificationResponse.Region
	taux_en_emploi_6_mois?: string
	taux_en_formation?: string
	taux_autres_6_mois?: string
	millesime?: string
}

/*
{
  "code_certification": "50022137",
  "filiere": "apprentissage",
  "millesime": "2020_2021",
  "region": {
    "code": "11",
    "nom": "Île-de-France"
  },
  "code_formation_diplome": "50022137",
  "diplome": {
    "code": "3",
    "libelle": "CAP"
  },
  "nb_annee_term": 1164,
  "nb_en_emploi_6_mois": 559,
  "nb_poursuite_etudes": 372,
  "nb_sortant": 791,
  "taux_autres_6_mois": 20,
  "taux_en_emploi_6_mois": 48,
  "taux_en_formation": 32,
  "_meta": {
    "titre": "Certification 50022137",
    "details": "Données InserJeunes pour la certification 50022137 (CAP filière apprentissage) pour le millesime 2020_2021"
  }
}
 */
