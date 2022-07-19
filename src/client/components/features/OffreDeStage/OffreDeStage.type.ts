type cmsComponent = {
  id: string
}

export enum domaines {
  ACHAT= 'achats',
  CULTURE= 'activités sociales et culturelles',
  ADMINISTRATION = 'administration',
  ARCHITECTURE = 'architecture / urbanisme',
  AUDIT = 'audit',
  CHIMIE = 'chimie / biologie / agronomie',
  COMMUNICATION = 'communication',
  COMMUNITY_MANAGEMENT = 'community management',
  COMPTABILITE = 'comptabilité / contrôle de gestion',
  GENIE_CIVIL = 'conception / génie civil / génie industriel',
  CONSEIL = 'conseil',
  DESIGN = 'design / UX / UI',
  INFORMATIQUE = 'développement informatique',
  DIRECTION = 'direction d\'entreprise',
  ENERGIE = 'énergie / matériaux / mécanique',
  ENSEIGNEMENT = 'enseignement',
  ENVIRONNEMENT = 'environnement',
  DATA = 'études / statistiques / data',
  EVENEMENTIEL = 'evénementiel',
  FISCALITE = 'fiscalite',
  GESTION_PROJET = 'gestion de projet / produit',
  GRAPHISME = 'graphisme / illustration',
  HOTELLERIE = 'hôtellerie - restauration',
  TELECOM = 'infra / réseaux / télécoms',
  JOURNALISME = 'journalisme / rp',
  JURIDIQUE = 'juridique',
  LOGISTIQUE = 'logistique',
  MARKETING = 'marketing',
  EXPLOITATION = 'production / fabrication / exploitation',
  AUDIOVISUELLE = 'production audiovisuelle',
  MAINTENANCE = 'qualité / maintenance',
  SUPPORT = 'relation client / support',
  RH = 'rh / formation',
  SANTE = 'santé',
  SERVICE_A_LA_PERSONNE = 'services à la personne',
  TRAVAUX = 'travaux / chantiers',
  NON_APPLICABLE = 'n/a' // obligatoire en unitaire et n/a par défaut
}

// export type OffreDeStage = {};

type LocalisationStageIndexeur = {
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
enum NiveauEtudeStage {
  NON_APPLICABLE = 'n/a',
  PRE_BAC = 'PREBAC',
  BAC = 'BAC',
  BAC_PLUS_1 = 'BAC+1',
  BAC_PLUS_2 = 'BAC+2',
  BAC_PLUS_3 = 'BAC+3',
  BAC_PLUS_4 = 'BAC+4',
  BAC_PLUS_5 = 'BAC+5',
}

enum SourceDesDonnees {
  INTERNE = 'interne',
  WELCOME_TO_THE_JUNGLE = 'welcome to the jungle',
  JOBIJOBA = 'jobijoba',
  HELLOWORK = 'hellowork',
  JOBTEASER = 'jobteaser'
}

export type OffreDeStageIndexeur = {
  titre: string
  description: string
  dateDeDebut: string
  id: string
  slug: string
  domaines?: Array<domaines>
  duree?: string
  dureeEnJour?: number
  dureeEnJourMax?: number
  localisation?: LocalisationStageIndexeur
  niveauEtude?: NiveauEtudeStage
  nomEmployeur?: string
  remunerationBase: number
  source?: SourceDesDonnees
  teletravailPossible?: boolean
};

interface EmployeurStageCMS extends cmsComponent {
  nom: string
  description: string
  logoUrl: string
  siteUrl: string
}

interface DomaineStageCMS extends cmsComponent {
  nom: domaines
}

interface PrerequisStageCMS extends cmsComponent {
  niveauEtude: NiveauEtudeStage
  profil: string
}
export type OffreDeStageAttributesFromCMS = {
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
  localisation?: LocalisationStageIndexeur
  niveauEtude?: NiveauEtudeStage
  employeur?: EmployeurStageCMS
  remunerationBase?: number
  source?: SourceDesDonnees
  teletravailPossible?: boolean
  preRequis: PrerequisStageCMS
}

type OffreDeStageDataFromCMS = {
  id: number,
  attributes: OffreDeStageAttributesFromCMS
}

// sera privé pour le service et sera parsé (nottament pour les dates et le sanitize, mais on l'utilise en attendant)
export type OffreDeStageInternalService = {
  data: OffreDeStageDataFromCMS
}
