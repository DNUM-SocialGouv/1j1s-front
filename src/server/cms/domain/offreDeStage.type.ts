type CmsComponent = {
	id: string
}

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
	_geo?: {
		lat: number
		lng: number
	}
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

export type OffreDeStageIndexée = {
	titre: string
	description: string
	dateDeDebut: string
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

export interface EmployeurStageCMS extends CmsComponent {
	nom: string
	description: string
	logoUrl: string
	siteUrl: string
}

export interface EmployeurDepotStage {
	nom: string
	description: string
	logoUrl: string | null
	siteUrl: string | null
	email: string
}

export interface DomaineStageCMS extends CmsComponent {
	nom: Domaines
}

export interface DomaineStageDepot {
	nom: Domaines
}

export interface OffreDeStageResponse {
	titre: string
	id: string
	slug: string
	dateDeDebut: string
	createdAt: string
	publishedAt: string
	updatedAt: string
	description: string
	urlDeCandidature?: string
	sourceCreatedAt: string
	sourceUpdatedAt: string
	sourcePublishedAt: string
	identifiantSource?: string
	domaines?: Array<DomaineStageCMS>
	duree?: string
	dureeEnJour?: number
	dureeEnJourMax?: number
	localisation?: LocalisationStageIndexée
	employeur?: EmployeurStageCMS
	remunerationBase?: number
	source?: SourceDesDonnées
	teletravailPossible?: boolean
}

export interface OffreDeStage {
	titre: string
	id: string
	slug: string
	dateDeDebut: string
	createdAt: string
	publishedAt: string
	updatedAt: string
	description: string
	urlDeCandidature?: string
	sourceCreatedAt: string
	sourceUpdatedAt: string
	sourcePublishedAt: string
	identifiantSource?: string
	domaines?: Array<DomaineStageCMS>
	duree?: string
	dureeEnJour?: number
	dureeEnJourMax?: number
	localisation?: LocalisationStageIndexée
	employeur?: EmployeurStageCMS
	remunerationBase?: number
	source?: SourceDesDonnées
	teletravailPossible?: boolean
}

export interface OffreDeStageDepot {
	identifiantSource: string
	publishedAt: null
	titre: string
	dateDeDebut: string
	description: string
	urlDeCandidature: string
	domaines: DomaineStageDepot[] | null
	dureeEnJour: number | null
	localisation: LocalisationDepotStageIndexée
	employeur: EmployeurDepotStage,
	remunerationBase: number | null
	source?: SourceDesDonnées
	teletravailPossible: boolean | null
}
