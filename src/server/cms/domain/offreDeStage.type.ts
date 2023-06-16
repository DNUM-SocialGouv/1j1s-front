export enum Domaines {
	ACHAT = 'achats',
	CULTURE = 'activités sociales et culturelles',
	AGRICULTURE = 'agriculture',
	ARCHITECTURE = 'architecture / urbanisme / immobilier',
	AUDIT = 'audit',
	CHIMIE = 'chimie / biologie / agronomie',
	COMMERCE = 'commerce',
	COMMUNICATION = 'communication',
	COMMUNITY_MANAGEMENT = 'community management',
	COMPTABILITE = 'comptabilité / contrôle de gestion',
	GENIE_CIVIL = 'conception / génie civil / génie industriel',
	CONSEIL = 'conseil',
	DESIGN = 'design / UX / UI',
	INFORMATIQUE = 'développement informatique',
	DIRECTION = 'direction d‘entreprise',
	ENERGIE = 'énergie / matériaux / mécanique / électronique',
	ENSEIGNEMENT = 'enseignement',
	ENVIRONNEMENT = 'environnement',
	EVENEMENTIEL = 'évènementiel',
	DATA = 'études / statistiques / data',
	FISCALITE = 'fiscalite / finance / assurance',
	GESTION_PROJET = 'gestion de projet / produit',
	GRAPHISME = 'graphisme / illustration',
	HOTELLERIE = 'hôtellerie - restauration',
	TELECOM = 'infra / réseaux / télécoms',
	JOURNALISME = 'journalisme / rp / médias',
	JURIDIQUE = 'juridique',
	LOGISTIQUE = 'logistique',
	LUXE = 'luxe / mode / textile',
	MARKETING = 'marketing',
	EXPLOITATION = 'production / fabrication / exploitation',
	MAINTENANCE = 'qualité / maintenance',
	SUPPORT = 'relation client / support',
	RH = 'rh / formation',
	SANTE = 'santé / services à la personne',
	SECTEUR_PUBLIC = 'secteur public',
	TRAVAUX = 'travaux / chantiers',
	VENTES = 'ventes',
	NON_RENSEIGNE = 'non renseigné' // obligatoire en unitaire et n/a par défaut
}

export type LocalisationStageIndexée = {
	ville?: string
	departement?: string
	codePostal?: string
	region?: string // enum de region ? (interessant pour savoir si pays en full + majuscule …)
	pays: string // enum de pays ? (interessant pour savoir si pays en full + majuscule …) (https://www.npmjs.com/package/i18n-iso-countries ?)
}

export interface LocalisationDepotStageIndexée {
	adresse: string
	ville: string
	departement: string | null
	codePostal: string
	region: string | null
	pays: string
}

export enum SourceDesDonnées {
	INTERNE = 'interne',
	WELCOME_TO_THE_JUNGLE = 'welcome to the jungle',
	JOBIJOBA = 'jobijoba',
	HELLOWORK = 'hellowork',
	JOBTEASER = 'jobteaser',
	STAGEFR_COMPRESSE = 'stagefr-compresse',
	STAGEFR_DECOMPRESSE = 'stagefr-decompresse',
}

// TODO (BRUJ 14-06-2023): à changer après la mise en place du nouveau modèle de données
export type OffreDeStageIndexée = {
	titre: string
	description: string
	dateDeDebut: string
	dateDeDebutMin: string
	dateDeDebutMax: string
	id: string
	slug: string
	domaines?: Array<Domaines>
	duree?: string
	dureeCategorisee?: string,
	dureeEnJour?: number
	dureeEnJourMax?: number
	localisation?: LocalisationStageIndexée
	nomEmployeur?: string
	logoUrlEmployeur?: string
	remunerationBase: number
	source?: SourceDesDonnées
	teletravailPossible?: boolean
};

export interface EmployeurStageCMS {
	nom: string
	description?: string
	logoUrl?: string
	siteUrl?: string
}

export interface EmployeurDepotStage {
	nom: string
	description: string
	logoUrl: string | null
	siteUrl: string | null
	email: string
}

export interface DomaineStageCMS {
	nom: Domaines
}

export interface DomaineStageDepot {
	nom: Domaines
}

export interface OffreDeStage {
	titre: string
	id: string
	slug: string
	dateDeDebut: string
	description: string
	urlDeCandidature?: string
	domaines: Array<Domaines>
	dureeEnJour?: number
	dureeEnJourMax?: number
	localisation: OffreDeStage.Localisation
	employeur: EmployeurStageCMS
	remunerationBase?: number
	source?: SourceDesDonnées
	teletravailPossible?: boolean
}

export namespace OffreDeStage {
	export interface Localisation {
		ville?: string
		departement?: string
		codePostal?: string
		region?: string
		pays?: string
	}
}

export interface OffreDeStageDepot {
	dateDeDebut: string
	description: string
	domaine: Domaines
	duree: string
	employeur: EmployeurDepotStage
	localisation: LocalisationDepotStageIndexée
	remunerationBase: number
	teletravailPossible: boolean | null
	titre: string
	urlDeCandidature: string
}
