import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

export function aFicheMetier(override?: Partial<FicheMétier>) {
	return {
		accesMetier: 'S‘il existe deux niveaux d‘accès, à bac + 3 et à bac + 5, la tendance est au recrutement de jeunes de plus en plus qualifiés. ',
		accrocheMetier: 'Son rôle: acheter les produits et services dont son entreprise a besoin, en négociant les meilleures conditions de prix, de délais et de service après-vente.',
		centresInteret: [
			{
				idOnisep: 'T-IDEO2.4811',
				libelle: 'J‘ai la bosse du commerce',
			},
		],
		competences: 'Entre intuition et rigueur',
		conditionTravail: 'Pour écrire le cahier des charges, l‘acheteur dialogue avec un " client interne " : souvent l‘opérationnel qui exprime un besoin.',
		formationsMinRequise: [
			{
				idOnisep: 'FOR.989',
				libelle: 'Mastère spé. Management de la fonction achat',
			},
		],
		id: 'id',
		idOnisep: 'MET.571',
		natureTravail: 'Acheter, cela semble simple ! Pourtant, la mission de l‘acheteur ne se limite pas au choix des produits. Il doit d‘abord rechercher et sélectionner les fournisseurs pour obtenir le meilleur rapport qualité/prix et ainsi réduire le plus possible les coûts et les stocks, et augmenter le chiffre d‘affaires de son service ou de son entreprise.',
		niveauAccesMin: [
			{
				idOnisep: 'REF.421',
				libelle: 'Bac + 3',
			},
		],
		nomMetier: 'acheteur/euse',
		secteursActivite: [
			{
				idOnisep: 'T-IDEO2.4852',
				libelle: 'Agriculture',
			},
		],
		statuts: [
			{
				idIdeo: '100215',
				idOnisep: 'T-ITM.9',
				libelle: 'Salarié',
			},
		],
		vieProfessionnelle: 'Intégrer le marché du travail',
		...override,
	};
}


export function aListAllFicheMetierNomMetier(listAllFicheMetierNomMetier?: string[]): string[] {
	return listAllFicheMetierNomMetier ?? ['ingénieur/e production en mécanique',
		'peintre en bâtiment',
		'développeur/euse rural/e humanitaire',
		'conseiller/ère en fusion-acquisition',
		'ingénieur/e en électronique numérique',
		'technicien/ne packaging',
		'microtechnicien/ne'];
}
