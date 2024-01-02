import { SourceDesDonnées } from '~/server/stages/domain/stages';


export namespace OffreStageResponseStrapi {
	export interface OffreStage {
		titre: string
		id: string
		slug: string
		dateDeDebutMin: string
		dateDeDebutMax: string
		createdAt: string
		publishedAt: string
		updatedAt: string
		description: string
		urlDeCandidature: string | null
		sourceCreatedAt: string
		sourceUpdatedAt: string
		sourcePublishedAt: string
		identifiantSource: string | null
		domaines?: Array<OffreStageResponseStrapi.Domaines>
		dureeEnJour: number | null
		dureeEnJourMax: number | null
		localisation?: OffreStageResponseStrapi.Localisation
		employeur?: OffreStageResponseStrapi.Employeur
		remunerationBase: number | null
		source: SourceDesDonnées | null
		teletravailPossible: boolean | null
	}

	export interface Localisation {
		adresse: string | null;
		ville: string | null;
		departement: string | null;
		codePostal: string | null;
		region: string | null;
		pays: string | null;
	}

	export interface Employeur {
		nom: string;
		description: string | null;
		logoUrl: string | null;
		siteUrl: string | null;
		email: string | null;
	}

	export interface Domaines {
		nom: Domaines.Nom;
	}

	export namespace Domaines {
		export enum Nom {
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
			NON_RENSEIGNE = 'non renseigné'
		}
	}
}

export type OffreStageDepotStrapi =
	Pick<OffreStageResponseStrapi.OffreStage, 'dateDeDebutMin' | 'dateDeDebutMax' | 'description' | 'domaines' | 'dureeEnJour' | 'remunerationBase' | 'teletravailPossible' | 'titre'>
	& {
	identifiantSource: string;
	publishedAt: null;
	urlDeCandidature: string;
	localisation: OffreStageResponseStrapi.Localisation;
	employeur: OffreStageResponseStrapi.Employeur;
	source: SourceDesDonnées.INTERNE;
}
