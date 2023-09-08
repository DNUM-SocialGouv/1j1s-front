import { aStrapiCollectionType } from '~/server/cms/infra/repositories/strapi.fixture';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';


export function aStrapiFicheMetier(override?: Partial<Strapi.CollectionType.FicheMétier>): Strapi.CollectionType.FicheMétier {
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

export function aStrapiCollectionFicheMetier(override?: Partial<Strapi.CollectionType.FicheMétier>): Strapi.CollectionType<Strapi.CollectionType.FicheMétier> {
	return aStrapiCollectionType([aStrapiFicheMetier(override)]);
}


export function aStrapiFicheMetierNomMetierList(): Strapi.CollectionType<Pick<Strapi.CollectionType.FicheMétier, 'nom_metier'>> {
	return aStrapiCollectionType([{ nom_metier: 'ingénieur/e production en mécanique' },
		{ nom_metier: 'peintre en bâtiment' },
		{ nom_metier: 'développeur/euse rural/e humanitaire' },
		{ nom_metier: 'conseiller/ère en fusion-acquisition' },
		{ nom_metier: 'ingénieur/e en électronique numérique' },
		{ nom_metier: 'technicien/ne packaging' },
		{ nom_metier: 'microtechnicien/ne' },
		{ nom_metier: 'ingénieur/e en production et expérimentations végétales' },
		{ nom_metier: 'géologue modélisateur/trice' },
		{ nom_metier: "décorateur/trice d'intérieur" },
		{ nom_metier: 'conducteur/trice de travaux' },
		{ nom_metier: 'responsable de laboratoire de recherche' },
		{ nom_metier: 'comptable' },
		{ nom_metier: 'technicien/ne prototypiste en agroéquipement' },
		{ nom_metier: 'couvreur/euse' },
		{ nom_metier: 'conseiller/ère agricole' },
		{ nom_metier: 'médecin de secours en montagne' },
		{ nom_metier: 'responsable qualité en agroalimentaire' },
		{ nom_metier: 'conducteur/trice de travaux en entreprises de travaux agricoles' },
		{ nom_metier: 'technicien/ne en métrologie' },
		{ nom_metier: 'libraire' },
		{ nom_metier: 'agent/e immobilier/ère' },
		{ nom_metier: 'développeur/euse informatique' },
		{ nom_metier: 'administrateur/trice territorial/e' },
		{ nom_metier: 'ingénieur/e études et développement en logiciels de simulation' }],
	{
		pagination: {
			page: 1,
			pageCount: 2,
			pageSize: 25,
			total: 42,
		},
	});
}


export function aStrapiPage2FicheMetierNomMetierList(): Strapi.CollectionType<Pick<Strapi.CollectionType.FicheMétier, 'nom_metier'>> {
	return aStrapiCollectionType([{ nom_metier: 'chef/fe de fabrication des industries graphiques' },
		{ nom_metier: 'biostatisticien/ne' },
		{ nom_metier: 'ingénieur/e système' },
		{ nom_metier: 'conservateur/trice territorial/e des bibliothèques' },
		{ nom_metier: 'administrateur/trice de base de données' },
		{ nom_metier: 'orthoprothésiste' },
		{ nom_metier: "enseignant/e d'art" },
		{ nom_metier: 'psychanalyste' },
		{ nom_metier: 'barman (barmaid)' },
		{ nom_metier: 'podo-orthésiste' },
		{ nom_metier: 'chargé/e de valorisation de la recherche' },
		{ nom_metier: 'serrurier/ère-métallier/ère' },
		{ nom_metier: 'expert/e-comptable' },
		{ nom_metier: 'conducteur/trice de train' },
		{ nom_metier: 'technicien/ne biologiste' },
		{ nom_metier: 'masseur/euse-kinésithérapeute' },
		{ nom_metier: 'caissier/ère' },
		{ nom_metier: 'charcutier/ère-traiteur/euse' },
		{ nom_metier: 'tailleur/euse et couturier/ère' },
		{ nom_metier: "formateur/trice d'adultes" },
		{ nom_metier: 'charpentier/ère métallique' },
		{ nom_metier: 'ingénieur/e forestier/ère' },
		{ nom_metier: 'horticulteur/trice' },
		{ nom_metier: 'installateur/trice en télécoms' },
		{ nom_metier: 'commerçant/e en alimentation' },
	], {
		pagination: {
			page: 2,
			pageCount: 32,
			pageSize: 25,
			total: 792,
		},
	});
}


