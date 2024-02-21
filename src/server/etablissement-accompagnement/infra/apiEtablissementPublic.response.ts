import Joi from 'joi';

import { JourSemaine } from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';

export namespace ResultatRechercheEtablissementPublicResponse {
	export interface EtablissementsPublicList {
		results: Array<EtablissementPublic>
	}

	export interface EtablissementPublic {
		id: string
		nom: string
		adresse: string
		plage_ouverture?: string
		adresse_courriel?: string
		telephone?: string
		pivot: string
	}

	export interface PivotParsed {
		type_service_local: string
	}

	export interface TelephoneParsed {
		valeur: string
	}

	export interface AdresseParsed {
		numero_voie: string
		code_postal: string
		nom_commune: string
		type_adresse: string
	}

	export interface PlageOuvertureParsed {
		nom_jour_debut: JourSemaine
		nom_jour_fin: JourSemaine
		valeur_heure_debut_1: string
		valeur_heure_debut_2: string
		valeur_heure_fin_1: string
		valeur_heure_fin_2: string
	}
}

export const apiEtablissementPublicSearchSchemas = Joi.array().items(
	Joi.object({
		adresse: Joi.string().required(),
		adresse_courriel: Joi.string(),
		id: Joi.string().required(),
		nom: Joi.string().required(),
		pivot: Joi.string().required(),
		plage_ouverture: Joi.string(),
		telephone: Joi.string(),
	}).options({ allowUnknown: true }),
);
