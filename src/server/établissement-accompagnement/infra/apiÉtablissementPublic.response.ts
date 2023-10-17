import Joi from 'joi';

export interface RésultatRechercheÉtablissementPublicResponse {
  features: RésultatRechercheÉtablissementPublicResponse.Feature[]
}

export namespace RésultatRechercheÉtablissementPublicResponse {
  export interface Feature {
    properties: Feature.Properties
  }

  export namespace Feature {
    export interface Properties {
      id: string
      nom: string
      adresses: Properties.Adresse[]
      horaires: Properties.Horaire[]
      email?: string
      telephone: string
      pivotLocal: string
    }

    export namespace Properties {
      export interface Adresse {
        type: string
        lignes: string[]
        codePostal: string
        commune: string
      }

      export interface Horaire {
        du: string
        au: string
        heures: Horaire.Heure[]
      }

      export namespace Horaire {
        export interface Heure {
          de: string
          a: string
        }
      }
    }
  }
}

export const apiEtablissementSearchSchemas = Joi.array().items(
	Joi.object({
		properties: Joi.object({
			adresses: Joi.array().items(
				Joi.object({
					codePostal: Joi.string().required(),
					commune: Joi.string().required(),
					lignes: Joi.array().items(Joi.string()).required(),
					type: Joi.string().required(),
				}),
			).required(),
			email: Joi.string(),
			horaires: Joi.array().items(
				Joi.object({
					au: Joi.string().required(),
					du: Joi.string().required(),
					heures: Joi.array().items(
						Joi.object({
							a: Joi.string().required(),
							de: Joi.string().required(),
						}),
					).required(),
				}),
			).required(),
			id: Joi.string().required(),
			nom: Joi.string().required(),
			pivotLocal: Joi.string().required(),
			telephone: Joi.string().required(),
		}).required(),
	}).options({ allowUnknown: true }),
);
