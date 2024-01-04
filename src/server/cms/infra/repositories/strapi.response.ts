import { SourceDesDonnées } from '~/server/cms/domain/offreDeStage.type';

export namespace Strapi {
	export interface SingleRelation<T> {
		data: Data<T> | null;
	}

	export interface CollectionRelation<T> {
		data: Data<T>[];
	}

	interface Response {
		meta: Meta;
	}

	export type SingleType<T> = { [Key in keyof SingleRelation<T>]: NonNullable<SingleRelation<T>[Key]> } & Response;
	export type CollectionType<T> = CollectionRelation<T> & Response;

	export interface Data<T> {
		attributes: T;
		id: number;
	}

	export interface Meta {
		pagination: Meta.Pagination;
	}

	namespace Meta {
		export interface Pagination {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		}
	}

	export interface Image {
		name: string;
		alternativeText: string;
		caption: string;
		width: number;
		height: number;
		formats?: Image.Formats;
		hash: string;
		ext: string;
		mime: string;
		size: number;
		url: string;
		previewUrl: string | null;
		provider: string | null;
		provider_metadata: string | null;
		createdAt: string;
		updatedAt: string;
	}

	export namespace Image {
		export interface Formats {
			large?: Formats.Format;
			medium?: Formats.Format;
			small?: Formats.Format;
			thumbnail?: Formats.Format;
		}

		export namespace Formats {
			export interface Format {
				ext: string;
				url: string;
				hash: string;
				mime: string;
				name: string;
				path: string | null;
				size: number;
				width: number;
				height: number;
			}
		}
	}

	export namespace SingleType {
		export interface LesMesuresJeunes {
			vieProfessionnelle: LesMesuresJeunes.MesureJeune[]
			orienterFormer: LesMesuresJeunes.MesureJeune[]
			accompagnement: LesMesuresJeunes.MesureJeune[]
			aidesFinancieres: LesMesuresJeunes.MesureJeune[]
		}

		export namespace LesMesuresJeunes {
			export interface MesureJeune {
				titre: string
				contenu: string
				url: string
				banniere: Strapi.SingleRelation<Strapi.Image>
				article: Strapi.SingleRelation<Strapi.CollectionType.Article>
				pourQui: string
			}
		}

		export interface LesMesuresEmployeurs {
			dispositifs: LesMesuresEmployeurs.Dispositif[];
		}

		export namespace LesMesuresEmployeurs {
			export interface Dispositif {
				titre: string
				contenu: string
				url: string
				banniere: Strapi.SingleRelation<Strapi.Image>
				article: Strapi.SingleRelation<Strapi.CollectionType.Article>
				pourQui: string
			}
		}

		export interface ListeActualités {
			listeActualites: ListeActualités.Actualité[];
		}

		export namespace ListeActualités {
			export interface Actualité {
				titre: string;
				contenu: string;
				url: string;
				banniere: Strapi.SingleRelation<Strapi.Image>;
				article: Strapi.SingleRelation<Strapi.CollectionType.Article>;
			}
		}
	}

	export namespace CollectionType {
		export interface Article {
			titre: string;
			banniere: Strapi.SingleRelation<Strapi.Image>;
			slug: string;
			contenu: string;
		}

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
			domaines?: Array<OffreStage.Domaines>
			dureeEnJour: number | null
			dureeEnJourMax: number | null
			localisation?: OffreStage.Localisation
			employeur?: OffreStage.Employeur
			remunerationBase: number | null
			source: SourceDesDonnées | null
			teletravailPossible: boolean | null
		}

		export namespace OffreStage {
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

		export type OffreStageDepot =
			Pick<OffreStage, 'dateDeDebutMin' | 'dateDeDebutMax' | 'description' | 'domaines' | 'dureeEnJour' | 'remunerationBase' | 'teletravailPossible' | 'titre'>
			& {
			identifiantSource: string;
			publishedAt: null;
			urlDeCandidature: string;
			localisation: OffreStage.Localisation;
			employeur: OffreStage.Employeur;
			source: SourceDesDonnées.INTERNE;
		}

		export interface Entreprise {
			nom_societe: string
			code_postal: string
			ville: string
			siret: string
			taille: string
			secteur: string
			prenom: string
			telephone: string
			email: string
			nom: string
			travail: string
			erreur: string
		}

		export interface VideoCampagneApprentissage {
			Titre: string
			Transcription: string
			Url: string
		}
	}
}
