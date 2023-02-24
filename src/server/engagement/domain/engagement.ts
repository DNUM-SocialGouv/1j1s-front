export type MissionId = string;

export namespace MissionEngagement {
	export namespace Recherche {
		export interface ServiceCivique {
			domaine?: ServiceCivique.Domain
			ouvertAuxMineurs?: boolean
			localisation?: Localisation
			page: number
		}

		export namespace ServiceCivique {
			export type Domain = 'culture-loisirs' | 'education' | 'environnement' | 'humanitaire' | 'sante' | 'solidarite-insertion' | 'sport' | 'vivre-ensemble' | 'autre'
		}

		export interface Benevolat {
			domaine?: Benevolat.Domain
			ouvertAuxMineurs?: boolean
			localisation?: Localisation
			page: number
		}

		export namespace Benevolat {
			export type Domain = 'culture-loisirs' | 'education' | 'environnement' | 'mémoire et citoyenneté' | 'prevention-protection' | 'sante' | 'solidarite-insertion' | 'sport' | 'vivre-ensemble' | 'autre'
		}

		export interface Localisation {
			distance: number
			latitude: number
			longitude: number
		}
	}
}

export interface Mission {
  id: MissionId
  description: string
  titre: string
  nomEntreprise?: string
  étiquetteList: string[]
  url?: string
  localisation?: string
  débutContrat?: string
  duréeContrat?: number
  openToMinors?: string
}

export const NOMBRE_RÉSULTATS_MISSION_PAR_PAGE = 15;

export interface RésultatsRechercheMission {
  nombreRésultats: number
  résultats: Mission[]
}

export namespace MissionEngagement {
  export interface Domaine {
    libellé: string
    valeur: string
  }
}

export const bénévolatDomaineList: MissionEngagement.Domaine[] = [
	{
		libellé: 'Culture et loisirs',
		valeur: 'culture-loisirs',
	},
	{
		libellé: 'Éducation',
		valeur: 'education',
	},
	{
		libellé: 'Environnement',
		valeur: 'environnement',
	},
	{
		libellé: 'Mémoire et citoyenneté',
		valeur: 'mémoire et citoyenneté',
	},
	{
		libellé: 'Prévention et protection',
		valeur: 'prevention-protection',
	},
	{
		libellé: 'Santé',
		valeur: 'sante',
	},
	{
		libellé: 'Solidarité et insertion',
		valeur: 'solidarite-insertion',
	},
	{
		libellé: 'Sport',
		valeur: 'sport',
	},
	{
		libellé: 'Vivre ensemble',
		valeur: 'vivre-ensemble',
	},
	{
		libellé: 'Autre',
		valeur: 'autre',
	},
];

export const serviceCiviqueDomaineList: MissionEngagement.Domaine[]  = [
	{
		libellé: 'Culture et Loisirs',
		valeur: 'culture-loisirs',
	},
	{
		libellé: 'Éducation',
		valeur: 'education',
	},
	{
		libellé: 'Environnement',
		valeur: 'environnement',
	},
	{
		libellé: 'Humanitaire',
		valeur: 'humanitaire',
	},
	{
		libellé: 'Santé',
		valeur: 'sante',
	},
	{
		libellé: 'Solidarité et insertion',
		valeur: 'solidarite-insertion',
	},
	{
		libellé: 'Sport',
		valeur: 'sport',
	},
	{
		libellé: 'Vivre ensemble',
		valeur: 'vivre-ensemble',
	},
	{
		libellé: 'Autre',
		valeur: 'autre',
	},
];
