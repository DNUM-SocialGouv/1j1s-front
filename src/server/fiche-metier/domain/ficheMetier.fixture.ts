import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

export function aFicheMetier(override?: Partial<FicheMétier>) {
	return {
		accesMetier: 'string',
		accrocheMetier: 'string',
		centresInteret: [
			{
				idOnisep: 'string',
				libelle: 'String',
			},
		],
		competences: 'string',
		conditionTravail: 'string',
		formationsMinRequise: [
			{
				idOnisep: 'string',
				libelle: 'String',
			},
		],
		id: 'string',
		idOnisep: 'string',
		natureTravail: 'string',
		niveauAccesMin: [
			{
				idOnisep: 'string',
				libelle: 'String',
			},
		],
		nomMetier: 'string',
		secteursActivite: [
			{
				idOnisep: 'string',
				libelle: 'String',
			},
		],
		statuts: [
			{
				idIdeo: 'string',
				idOnisep: 'string',
				libelle: 'String',
			},
		],
		vieProfessionnelle: 'string',
		...override,
	};
}

export function aStrapiFicheMetier(override?: Partial<Strapi.CollectionType.FicheMétier>): Partial<Strapi.CollectionType<Strapi.CollectionType.FicheMétier>> {
	return { 
		data: [{
			attributes: {
				acces_metier: 'string',
				accroche_metier: 'string',
				centres_interet: [
					{
						identifiant: 'string',
						libelle: 'string',
					},
				],
				competences: 'string',
				condition_travail: 'string',
				formations_min_requise: [
					{
						identifiant: 'string',
						libelle: 'string',
					},
				],
				id: 'string',
				identifiant: 'string',
				nature_travail: 'string',
				niveau_acces_min: [
					{
						identifiant: 'string',
						libelle: 'string',
					},
				],
				nom_metier: 'string',
				secteurs_activite: [
					{
						identifiant: 'string',
						libelle: 'string',
					},
				],
				statuts: [
					{
						id_ideo1: 'string',
						identifiant: 'string',
						libelle: 'string',
					},
				],
				vie_professionnelle: 'string',
				...override,
			},
			id: 678,
		}],
	};
}
