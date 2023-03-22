export interface RésultatRechercheFormation {
	adresse?: string
	titre: string
	nomEntreprise?: string
	tags: [ localisation: string | undefined, niveauRequis: NiveauRequis | 'Autre' ]
	id: string
	codePostal?: string
	ville?: string
	codeCertification?: string
}

export type Formation = {
	titre?: string
	nomEntreprise?: string
	tags: string[]
	description?: string
	objectif?: string
	duréeIndicative?: string
	nombreHeuresEnEntreprise?: number
	nombreHeuresAuCentre?: number
	adresse: { adresseComplète?: string, codePostal?: string }
	contact: { email?: string; tel?: string; url?: string }
	lienDemandeRendezVous?: string
}

export enum NiveauRequis {
	NIVEAU_3 = 'CAP, autres formations niveau 3',
	NIVEAU_4 = 'Bac, autres formations niveau 4',
	NIVEAU_5 = 'BTS, DEUST, autres formations niveau 5 (Bac + 2)',
	NIVEAU_6 = 'Licence, BUT, autres formations niveau 6 (Bac + 3)',
	NIVEAU_7_8 = 'Master, titre ingénieur, autres formations niveau 7 ou 8 (Bac + 5)',
}

export interface FormationFiltre {
	codeRomes: Array<string>
	codeCommune: string
	distanceCommune: string
	latitudeCommune: string
	longitudeCommune: string
	niveauEtudes?: string
}

export namespace FormationFiltre {
	export interface AvecCodeCertification extends FormationFiltre {
		codeCertification?: string
	}
}

export namespace Formation {
	type niveauEtudes = '3' | '4' | '5' | '6' | '7' | 'indifférent'

	export interface NiveauRequisFiltreRecherche {
		libellé: string
		valeur: niveauEtudes
	}

	export const NIVEAU_3: NiveauRequisFiltreRecherche = {
		libellé: NiveauRequis.NIVEAU_3,
		valeur: '3',
	};

	export const NIVEAU_4: NiveauRequisFiltreRecherche = {
		libellé: NiveauRequis.NIVEAU_4,
		valeur: '4',
	};

	export const NIVEAU_5: NiveauRequisFiltreRecherche = {
		libellé: NiveauRequis.NIVEAU_5,
		valeur: '5',
	};

	export const NIVEAU_6: NiveauRequisFiltreRecherche = {
		libellé: NiveauRequis.NIVEAU_6,
		valeur: '6',
	};

	export const NIVEAU_7: NiveauRequisFiltreRecherche = {
		libellé: NiveauRequis.NIVEAU_7_8,
		valeur: '7',
	};

	export const NIVEAU_INDIFFERENT: NiveauRequisFiltreRecherche = {
		libellé: 'Indifférent',
		valeur: 'indifférent',
	};

	export const NIVEAU_ETUDES: NiveauRequisFiltreRecherche[] = [
		Formation.NIVEAU_3,
		Formation.NIVEAU_4,
		Formation.NIVEAU_5,
		Formation.NIVEAU_6,
		Formation.NIVEAU_7,
		Formation.NIVEAU_INDIFFERENT,
	];
}
