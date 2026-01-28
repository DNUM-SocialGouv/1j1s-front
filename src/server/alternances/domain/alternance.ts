import { AlternanceStatus } from '~/server/alternances/infra/status';

export interface AlternanceEntreprise {
	nom?: string | null
	adresse?: string | null
	téléphone?: string | null
}

export interface Alternance {
	durée?: string | null
	id: string
	titre: string
	entreprise: AlternanceEntreprise
	description?: string | null
	descriptionEmployeur?: string | null
	localisation?: string | null
	niveauRequis?: string | null
	natureDuContrat?: string | null
	typeDeContrat?: string[] | null
	compétences?: string[] | null
	dateDébut?: Date | null
	rythmeAlternance?: string | null
	source: AlternanceSource
	lienPostuler?: string | null
	status?: AlternanceStatus | null
}

export type ResultatRechercheAlternance = {
	offreList: Array<ResultatRechercheAlternanceOffre>,
	entrepriseList: Array<ResultatRechercheAlternanceEntreprise>
}

export type ResultatRechercheAlternanceOffre = Pick<Alternance, 'id' | 'titre' | 'source' | 'entreprise' | 'localisation' | 'typeDeContrat' | 'niveauRequis'>

export interface ResultatRechercheAlternanceEntreprise {
	adresse?: string
	nom: string
	secteurs?: Array<string>
	id?: string
	candidaturePossible: boolean
	nombreSalariés?: ResultatRechercheAlternanceNombreSalaries | null
}

export interface ResultatRechercheAlternanceNombreSalaries {
	min: number
	max: number
}

export enum AlternanceSource {
	MATCHA,
	FRANCE_TRAVAIL,
}

export enum AlternanceContrat {
	ALTERNANCE = 'Contrat d‘alternance',
}

export interface AlternanceFiltre {
	codeRomes: Array<string>
	codeCommune: string
	distanceCommune: string
	latitudeCommune: string
	longitudeCommune: string
}

export function isMatcha(source: AlternanceSource): source is AlternanceSource.MATCHA {
	return source === AlternanceSource.MATCHA;
}

export function isFranceTravail(source: AlternanceSource): source is AlternanceSource.FRANCE_TRAVAIL {
	return source === AlternanceSource.FRANCE_TRAVAIL;
}
