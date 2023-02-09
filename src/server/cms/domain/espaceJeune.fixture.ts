import { strapiImageFixture } from '~/server/cms/infra/repositories/strapi.fixture';
import {
	ArticleSimpleAttributesResponse,
	CarteEspaceJeuneResponse,
	EspaceJeuneAttributesResponse,
	StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';

import { CarteEspaceJeune, EspaceJeune } from './espaceJeune';

export function aCarteEspaceJeune(override?: Partial<CarteEspaceJeune>): CarteEspaceJeune {
	return {
		article: {
			contenu: 'Contenu',
			slug: 'slug-titre',
			titre: 'Titre',
		},
		bannière: {
			alt: 'text',
			url: 'https://animage.jpg',
		},
		categorie: 'Catégorie',
		concerné: 'pour les 12 à 18mois',
		contenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		extraitContenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s …',
		link: '/articles/slug-titre',
		titre: 'Un titre de carte',
		url: 'Une belle url de carte',
		...override,
	};
}

export function aCarteEspaceJeuneList(categorie?: string): CarteEspaceJeune[] {
	return [
		aCarteEspaceJeune({ categorie }),
		aCarteEspaceJeune({ article: null, categorie, link: 'Une belle url de carte' }),
		aCarteEspaceJeune({ categorie }),
		aCarteEspaceJeune({ categorie }),
	];
}

export function anEspaceJeune(): EspaceJeune {
	return {
		accompagnement: aCarteEspaceJeuneList('Accompagnement'),
		aidesFinancières:  aCarteEspaceJeuneList('Aides financières'),
		orienterFormer:  aCarteEspaceJeuneList('Orientation et formation'),
		vieProfessionnelle:  aCarteEspaceJeuneList('Entrée dans la vie professionnelle'),
	};
}

export function aStrapiArticleResponse(): StrapiSingleTypeResponse<ArticleSimpleAttributesResponse> {
	return {
		data: {
			attributes: {
				contenu: 'Contenu',
				slug: 'slug-titre',
				titre: 'Titre',
			},
			id: 345,
		},
	};
}

function aCarteEspaceJeuneResponse(override?: Partial<CarteEspaceJeuneResponse>): CarteEspaceJeuneResponse {
	return {
		article: aStrapiArticleResponse(),
		banniere: strapiImageFixture(),
		contenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		pourQui: 'pour les 12 à 18mois',
		titre: 'Un titre de carte',
		url: 'Une belle url de carte',
		...override,
	};
}

export function anEspaceJeuneResponse(override?: Partial<StrapiSingleTypeResponse<EspaceJeuneAttributesResponse>>): StrapiSingleTypeResponse<EspaceJeuneAttributesResponse> {
	return {
		data: {
			attributes: {
				accompagnement: [
					aCarteEspaceJeuneResponse(),
					aCarteEspaceJeuneResponse({ article: undefined }),
					aCarteEspaceJeuneResponse(),
					aCarteEspaceJeuneResponse(),
				],
				aidesFinancieres: [
					aCarteEspaceJeuneResponse(),
					aCarteEspaceJeuneResponse({ article: undefined }),
					aCarteEspaceJeuneResponse(),
					aCarteEspaceJeuneResponse(),
				],
				orienterFormer: [
					aCarteEspaceJeuneResponse(),
					aCarteEspaceJeuneResponse({ article: undefined }),
					aCarteEspaceJeuneResponse(),
					aCarteEspaceJeuneResponse(),
				],
				vieProfessionnelle: [
					aCarteEspaceJeuneResponse(),
					aCarteEspaceJeuneResponse({ article: undefined }),
					aCarteEspaceJeuneResponse(),
					aCarteEspaceJeuneResponse(),
				],
			},
			id: 456,
		},
		...override,
	};
}
