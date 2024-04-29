export interface EtablissementAccompagnement {
	nom: string
	adresse?: string
	id: string
	telephone?: string
	email?: string
	horaires?: Array<EtablissementAccompagnement.Horaire>
	type: TypeÉtablissement
}

export type ContactEtablissementAccompagnement = Required<Pick<EtablissementAccompagnement, 'nom' | 'email' | 'type'>>

export namespace EtablissementAccompagnement {
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

export interface ParametresRechercheEtablissementAccompagnement {
	typeAccompagnement: string
	codeCommune: string
}

export function isTypeEtablissement(type: string): type is TypeÉtablissement {
	return Object.values(TypeÉtablissement).includes(type as TypeÉtablissement);
}

export enum TypeÉtablissement {
	FRANCE_TRAVAIL = 'france_travail',
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
