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
