import { StrapiFicheMetier } from '~/server/fiche-metier/infra/strapiFicheMetier';


export function aStrapiFicheMetier(override?: Partial<StrapiFicheMetier>): StrapiFicheMetier {
	return {
		acces_metier: 'S‘il existe deux niveaux d‘accès, à bac + 3 et à bac + 5, la tendance est au recrutement de jeunes de plus en plus qualifiés. ',
		accroche_metier: 'Son rôle: acheter les produits et services dont son entreprise a besoin, en négociant les meilleures conditions de prix, de délais et de service après-vente.',
		centres_interet: [
			{
				identifiant: 'T-IDEO2.4811',
				libelle: 'j‘ai la bosse du commerce',
			},
		],
		competences: 'Entre intuition et rigueur',
		condition_travail: 'Pour écrire le cahier des charges, l‘acheteur dialogue avec un " client interne " : souvent l‘opérationnel qui exprime un besoin.',
		formations_min_requise: [
			{
				identifiant: 'FOR.989',
				libelle: 'mastère spé. Management de la fonction achat',
			},
		],
		id: 'id',
		identifiant: 'MET.571',
		nature_travail: 'Acheter, cela semble simple ! Pourtant, la mission de l‘acheteur ne se limite pas au choix des produits. Il doit d‘abord rechercher et sélectionner les fournisseurs pour obtenir le meilleur rapport qualité/prix et ainsi réduire le plus possible les coûts et les stocks, et augmenter le chiffre d‘affaires de son service ou de son entreprise.',
		niveau_acces_min: [
			{
				identifiant: 'REF.421',
				libelle: 'Bac + 3',
			},
		],
		nom_metier: 'acheteur/euse',
		secteurs_activite: [
			{
				identifiant: 'T-IDEO2.4852',
				libelle: 'Agriculture',
			},
		],
		statuts: [
			{
				id_ideo1: '100215',
				identifiant: 'T-ITM.9',
				libelle: 'salarié',
			},
		],
		vie_professionnelle: 'Intégrer le marché du travail',
		...override,
	};
}
