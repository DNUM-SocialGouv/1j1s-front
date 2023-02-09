import {
	ArticleAttributesResponse,
	StrapiCollectionTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { FicheMétierHttp } from '~/server/fiche-metier/domain/ficheMetierHttp';
import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export function strapiImageFixture(override?: Strapi.ImageAttributes): Strapi.Image {
	return {
		data: {
			attributes: {
				alternativeText: 'text',
				caption: 'string',
				createdAt: 'string',
				ext: 'string',
				formats: strapiImageFormatListFixture(),
				hash: 'string',
				height: 100,
				mime: 'string',
				name: 'string',
				previewUrl: 'string',
				provider: 'string',
				provider_metadata: 'string',
				size: 100,
				updatedAt: 'string',
				url: 'https://animage.jpg',
				width: 100,
				...override,
			},
		},
	};
}

function strapiImageFormatListFixture(): Strapi.ImageFormatList {
	return {
		large: {
			ext: 'string',
			hash: 'string',
			height: 100,
			mime: 'string',
			name: 'string',
			path: 'string',
			size: 100,
			url: 'string',
			width: 100,
		},
	};
}

export function aStrapiFicheMetierNomMetierList(): StrapiCollectionTypeResponse<Pick<FicheMétierHttp, 'nom_metier'>> {
	return {
		data: [
			{
				attributes: { nom_metier: 'ingénieur/e production en mécanique' },
				id: 129,
			},
			{
				attributes: { nom_metier: 'peintre en bâtiment' },
				id: 2,
			}, {
				attributes: { nom_metier: 'développeur/euse rural/e humanitaire' },
				id: 3,
			}, {
				attributes: { nom_metier: 'conseiller/ère en fusion-acquisition' },
				id: 4,
			}, {
				attributes: { nom_metier: 'ingénieur/e en électronique numérique' },
				id: 130,
			}, {
				attributes: { nom_metier: 'technicien/ne packaging' },
				id: 254,
			}, {
				attributes: { nom_metier: 'microtechnicien/ne' },
				id: 266,
			}, {
				attributes: { nom_metier: 'ingénieur/e en production et expérimentations végétales' },
				id: 6,
			}, {
				attributes: { nom_metier: 'géologue modélisateur/trice' },
				id: 8,
			}, {
				attributes: { nom_metier: "décorateur/trice d'intérieur" },
				id: 134,
			}, {
				attributes: { nom_metier: 'conducteur/trice de travaux' },
				id: 136,
			}, {
				attributes: { nom_metier: 'responsable de laboratoire de recherche' },
				id: 12,
			}, {
				attributes: { nom_metier: 'comptable' },
				id: 13,
			}, {
				attributes: { nom_metier: 'technicien/ne prototypiste en agroéquipement' },
				id: 19,
			}, {
				attributes: { nom_metier: 'couvreur/euse' },
				id: 139,
			}, {
				attributes: { nom_metier: 'conseiller/ère agricole' },
				id: 141,
			}, {
				attributes: { nom_metier: 'médecin de secours en montagne' },
				id: 15,
			}, {
				attributes: { nom_metier: 'responsable qualité en agroalimentaire' },
				id: 17,
			}, {
				attributes: { nom_metier: 'conducteur/trice de travaux en entreprises de travaux agricoles' },
				id: 18,
			}, {
				attributes: { nom_metier: 'technicien/ne en métrologie' },
				id: 332,
			}, {
				attributes: { nom_metier: 'libraire' },
				id: 145,
			}, {
				attributes: { nom_metier: 'agent/e immobilier/ère' },
				id: 147,
			}, {
				attributes: { nom_metier: 'développeur/euse informatique' },
				id: 21,
			}, {
				attributes: { nom_metier: 'administrateur/trice territorial/e' },
				id: 23,
			}, {
				attributes: { nom_metier: 'ingénieur/e études et développement en logiciels de simulation' },
				id: 24,
			},
		],
		meta: {
			pagination:
				{
					page: 1,
					pageCount: 2,
					pageSize: 25,
					total: 42,
				},
		},
	};
}

export function aStrapiPage2FicheMetierNomMetierList(): StrapiCollectionTypeResponse<Pick<FicheMétierHttp, 'nom_metier'>> {
	return {
		data: [
			{
				attributes: { nom_metier: 'chef/fe de fabrication des industries graphiques' },
				id: 150,
			}, {
				attributes: { nom_metier: 'biostatisticien/ne' },
				id: 26,
			}, {
				attributes: { nom_metier: 'ingénieur/e système' },
				id: 27,
			}, {
				attributes: { nom_metier: 'conservateur/trice territorial/e des bibliothèques' },
				id: 28,
			}, {
				attributes: { nom_metier: 'administrateur/trice de base de données' },
				id: 29,
			}, {
				attributes: { nom_metier: 'orthoprothésiste' },
				id: 153,
			}, {
				attributes: { nom_metier: "enseignant/e d'art" },
				id: 154,
			}, {
				attributes: { nom_metier: 'psychanalyste' },
				id: 156,
			}, {
				attributes: { nom_metier: 'barman (barmaid)' },
				id: 32,
			}, {
				attributes: { nom_metier: 'podo-orthésiste' },
				id: 160,
			}, {
				attributes: { nom_metier: 'chargé/e de valorisation de la recherche' },
				id: 162,
			}, {
				attributes: { nom_metier: 'serrurier/ère-métallier/ère' },
				id: 35,
			}, {
				attributes: { nom_metier: 'expert/e-comptable' },
				id: 36,
			}, {
				attributes: { nom_metier: 'conducteur/trice de train' },
				id: 42,
			}, {
				attributes: { nom_metier: 'technicien/ne biologiste' },
				id: 166,
			}, {
				attributes: { nom_metier: 'masseur/euse-kinésithérapeute' },
				id: 168,
			}, {
				attributes: { nom_metier: 'caissier/ère' },
				id: 39,
			}, {
				attributes: { nom_metier: 'charcutier/ère-traiteur/euse' },
				id: 41,
			}, {
				attributes: { nom_metier: 'tailleur/euse et couturier/ère' },
				id: 170,
			}, {
				attributes: { nom_metier: "formateur/trice d'adultes" },
				id: 171,
			}, {
				attributes: { nom_metier: 'charpentier/ère métallique' },
				id: 175,
			}, {
				attributes: { nom_metier: 'ingénieur/e forestier/ère' },
				id: 44,
			}, {
				attributes: { nom_metier: 'horticulteur/trice' },
				id: 45,
			}, {
				attributes: { nom_metier: 'installateur/trice en télécoms' },
				id: 177,
			}, {
				attributes: { nom_metier: 'commerçant/e en alimentation' },
				id: 48,
			},
		],
		meta: {
			pagination: {
				page: 2,
				pageCount: 32,
				pageSize: 25,
				total: 792,
			},
		},
	};
}

export function aStrapiArticleSlugList(): StrapiCollectionTypeResponse<Pick<ArticleAttributesResponse, 'slug'>> {
	return {
		data: [
			{
				attributes: { slug: 'l-aide-exceptionnelle-pour-l-apprentissage-l-atout-qu-il-faut-pour-vos-candidatures' },
				id: 15,
			}, {
				attributes: { slug: 'pec-jeunes-pour-developper-des-competences-transferables' },
				id: 16,
			}, {
				attributes: { slug: 'faire-un-service-civique' },
				id: 1,
			}, {
				attributes: { slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand' },
				id: 19,
			}, {
				attributes: { slug: 'aide-a-l-embauche-d-un-jeune-en-contrat-initiative-emploi-jeunes-cie-jeunes-dans-le-secteur-marchand' },
				id: 20,
			}, {
				attributes: { slug: 'prime-pour-le-recrutement-d-un-jeune-en-contrat-d-apprentissage' },
				id: 21,
			}, {
				attributes: { slug: 'prime-pour-l-accueil-d-un-jeune-en-volontariat-territorial-en-entreprise-vte-vert' },
				id: 23,
			}, {
				attributes: { slug: 'financement-du-recrutement-d-un-jeune-sur-un-poste-d-animation-locale-en-association' },
				id: 24,
			}, {
				attributes: { slug: 'prime-pour-le-recrutement-d-un-jeune-en-contrat-de-professionnalisation' },
				id: 22,
			}, {
				attributes: { slug: 'service-civique' },
				id: 26,
			}, {
				attributes: { slug: 'choisir-un-secteur-qui-recrute-16-000-formations-creees-dans-le-secteur-de-la-sante-pour-devenir-infirimier-e-ou-aide-soignant-e' },
				id: 28,
			}, {
				attributes: { slug: 'votre-emploi-dans-le-domaine-sportif-c-est-grace-a-l-ans' },
				id: 27,
			}, {
				attributes: { slug: 'l-e2c-un-accompagnement-sur-mesure-vers-une-insertion-durable' },
				id: 33,
			}, {
				attributes: { slug: 'grace-au-dispositif-sesame-accedez-aux-metiers-du-sport-de-l-animation' },
				id: 34,
			}, {
				attributes: { slug: 'la-promo-16-18-afpa' },
				id: 37,
			}, {
				attributes: { slug: 'le-contrat-d-initiative-emploi-jeunes-cie-jeunes-votre-passeport-vers-l-emploi' },
				id: 38,
			}, {
				attributes: { slug: 'le-parcours-d-accompagnement-contractualise-vers-l-emploi-et-l-autonomie-pacea-veritable-levier-dans-votre-insertion-sociale-et-professionnelle' },
				id: 40,
			}, {
				attributes: { slug: 'accedez-a-une-formation-pour-progresser-rapidement-dans-le-numerique' },
				id: 39,
			}, {
				attributes: { slug: 'des-places-supplementaires-pour-vous-en-cap-et-bts' },
				id: 30,
			}, {
				attributes: { slug: 'dans-le-centre-epide-de-votre-choix-beneficiez-d-une-formation-individualisee-pour-acceder-a-l-emploi-ou-a-une-formation-qualifiante' },
				id: 31,
			}, {
				attributes: { slug: 'boostez-votre-recherche-d-emploi-grace-a-l-accompagnement-intensif-jeunes' },
				id: 32,
			}, {
				attributes: { slug: '16-18-obligation-de-formation' },
				id: 2,
			}, {
				attributes: { slug: 'mission-locale' },
				id: 48,
			}, {
				attributes: { slug: 'comment-constituer-un-dossier-locatif' },
				id: 82,
			},
		],
		meta: {
			pagination: {
				page: 1,
				pageCount: 1,
				pageSize: 24,
				total: 24,
			},
		},
	};
}
