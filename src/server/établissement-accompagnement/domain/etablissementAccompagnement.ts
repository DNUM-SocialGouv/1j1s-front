import { Alternance } from '~/server/alternances/domain/alternance';

export interface ÉtablissementAccompagnement {
	nom: string
	adresse?: string
	id: string
	telephone?: string
	email?: string
	horaires?: Array<ÉtablissementAccompagnement.Horaire>
	type: TypeÉtablissement
}

export type ContactÉtablissementAccompagnement = Required<Pick<ÉtablissementAccompagnement, 'nom' | 'email' | 'type'>>

export namespace ÉtablissementAccompagnement {
	export interface Horaire {
		jour: JourSemaine
		heures: Array<Horaire.Heure>
	}

	export namespace Horaire {
		export interface Heure {
			début: string
			fin: string
		}
	}
}

export interface ParamètresRechercheÉtablissementAccompagnement {
	codePostal: string
	typeAccompagnement: string
}

export function isTypeEtablissement(type: string): type is TypeÉtablissement {
	return Object.values(TypeÉtablissement).includes(type as TypeÉtablissement);
}

export enum TypeÉtablissement {
	AGENCE_POLE_EMPLOI = 'france_travail',
	MISSION_LOCALE = 'mission_locale',
	INFO_JEUNE = 'cij',
}

export enum JourSemaine {
	LUNDI = 'Lundi',
	MARDI = 'Mardi',
	MERCREDI = 'Mercredi',
	JEUDI = 'Jeudi',
	VENDREDI = 'Vendredi',
	SAMEDI = 'Samedi',
	DIMANCHE = 'Dimanche'
}
