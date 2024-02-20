import Joi from 'joi';

import { JourSemaine } from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';

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

	export interface PivotLocal {
		type_service_local: string
	}

	export interface Telephone {
		valeur: string
	}

	export interface Adresse {
		numero_voie: string
		code_postal: string
		nom_commune: string
		type_adresse: string
	}

	export interface PlageOuverture {
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
		adresse: Joi.array().items(
			Joi.object({
				code_postal: Joi.string().required(),
				lignes: Joi.string().required(),
				nom_commune: Joi.string().required(),
			}),
		).required(),
		adresse_courriel: Joi.string(),
		id: Joi.string().required(),
		nom: Joi.string().required(),
		pivot: Joi.array().items(Joi.object({
			type_service_local: Joi.string().required(),
		})).required(),
		plage_ouverture: Joi.array().items(
			Joi.object({
				nom_jour_debut: Joi.string().required(),
				nom_jour_fin: Joi.string().required(),
				valeur_heure_debut_1: Joi.string().required(),
				valeur_heure_debut_2: Joi.string().required(),
				valeur_heure_fin_1: Joi.string().required(),
				valeur_heure_fin_2: Joi.string().required(),
			}),
		),
		telephone: Joi.string(),
	}).options({ allowUnknown: true }),
);
