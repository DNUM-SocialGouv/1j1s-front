import { anArticle } from '~/server/cms/domain/article.fixture';
import { aStrapiArticle, aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

import { CarteEspaceJeune, EspaceJeune } from './espaceJeune';

export function aCarteEspaceJeune(override?: Partial<CarteEspaceJeune>): CarteEspaceJeune {
	return {
		article: anArticle(),
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
		aCarteEspaceJeune({ article: undefined, categorie, link: 'Une belle url de carte' }),
		aCarteEspaceJeune({ categorie }),
		aCarteEspaceJeune({ categorie }),
	];
}

export function anEspaceJeune(): EspaceJeune {
	return {
		accompagnement: aCarteEspaceJeuneList('Accompagnement'),
		aidesFinancières: aCarteEspaceJeuneList('Aides financières'),
		orienterFormer: aCarteEspaceJeuneList('Orientation et formation'),
		vieProfessionnelle: aCarteEspaceJeuneList('Entrée dans la vie professionnelle'),
	};
}

function aCarteEspaceJeuneResponse(override?: Partial<Strapi.SingleType.LesMesuresJeunes.MesureJeune>): Strapi.SingleType.LesMesuresJeunes.MesureJeune {
	return {
		article: aStrapiSingleRelation(aStrapiArticle()),
		banniere: aStrapiSingleRelation(aStrapiImage()),
		contenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		pourQui: 'pour les 12 à 18mois',
		titre: 'Un titre de carte',
		url: 'Une belle url de carte',
		...override,
	};
}

export function anEspaceJeuneResponse(): Strapi.SingleType.LesMesuresJeunes {
	return {
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
	};
}
