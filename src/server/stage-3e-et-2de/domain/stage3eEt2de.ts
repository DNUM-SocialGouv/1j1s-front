import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

export interface Stage3eEt2de {
	accessiblePersonnesEnSituationDeHandicap: boolean,
	nomEntreprise: string
	adresse: Stage3eEt2de.Adresse
	domaine: string
	nombreDeSalaries?: string
	modeDeContact?: ModeDeContact
}

export namespace Stage3eEt2de {
	export interface Adresse {
		codeDepartement: string
		codePostal: string
		rueEtNumero: string
		ville: string
	}
}

export interface ResultatRechercheStage3eEt2de {
	nombreDeResultats: number
	resultats: Array<Stage3eEt2de>
}

export interface Stage3eEt2deFiltre {
	codeMetier?: string
	latitudeCommune: string
	longitudeCommune: string
	distanceCommune: string
}
