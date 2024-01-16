import { Actualité } from '~/server/cms/domain/actualité';
import { Article } from '~/server/cms/domain/article';
import { Image } from '~/server/cms/domain/image';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

export function mapArticle(articleResponse: Strapi.CollectionType.Article): Article {
	return {
		bannière: flatMapSingleImage(articleResponse.banniere),
		contenu: articleResponse.contenu,
		slug: articleResponse.slug,
		titre: articleResponse.titre,
	};
}

function flatMapSingleRelation<StrapiType, ReturnType>(relation: Strapi.SingleRelation<StrapiType> | undefined, mapper: (data: NonNullable<StrapiType>) => ReturnType): ReturnType | undefined {
	if (!relation) {
		return undefined;
	}
	const strapiType = relation.data?.attributes;
	if (!strapiType) {
		return undefined;
	}
	return mapper(strapiType);
}

export function mapMesuresEmployeurs(strapiLesMesuresEmployeurs: Strapi.SingleType.LesMesuresEmployeurs): MesureEmployeur[] {
	return strapiLesMesuresEmployeurs.dispositifs.map(mapCartesMesuresEmployeursList);
}

function mapCartesMesuresEmployeursList(strapiLesMesuresEmployeursDispositif: Strapi.SingleType.LesMesuresEmployeurs.Dispositif): MesureEmployeur {
	const article = flatMapSingleRelation(strapiLesMesuresEmployeursDispositif.article, mapArticle);
	return {
		article,
		banniere: flatMapSingleImage(strapiLesMesuresEmployeursDispositif.banniere),
		contenu: strapiLesMesuresEmployeursDispositif.contenu,
		extraitContenu: getExtraitContenu(strapiLesMesuresEmployeursDispositif.contenu, 110),
		link: article ? `/articles/${article.slug}` : strapiLesMesuresEmployeursDispositif.url,
		pourQui: strapiLesMesuresEmployeursDispositif.pourQui,
		titre: strapiLesMesuresEmployeursDispositif.titre,
		url: strapiLesMesuresEmployeursDispositif.url,
	};
}

export function mapStrapiListeActualités(strapiListeActualités: Strapi.SingleType.ListeActualités): Actualité[] {
	return strapiListeActualités.listeActualites.map(mapStrapiActualité);
}

function mapStrapiActualité(strapiActualité: Strapi.SingleType.ListeActualités.Actualité): Actualité {
	const article = flatMapSingleRelation(strapiActualité.article, mapArticle);
	return {
		article,
		bannière: flatMapSingleImage(strapiActualité.banniere),
		contenu: strapiActualité.contenu,
		extraitContenu: getExtraitContenu(strapiActualité.contenu, 110),
		link: article ? `/articles/${article.slug}` : strapiActualité.url,
		titre: strapiActualité.titre,
	};
}

function getExtraitContenu(contenu: string, size = 120): string {
	if (contenu.length < size) return contenu;
	const end = contenu.substring(size);
	const charactersLeft = end.indexOf(' ');
	const brief = contenu.substring(0, size + charactersLeft);
	return `${brief} …`;
}

export function mapServiceJeuneList(response: Strapi.SingleType.LesMesuresJeunes): Array<ServiceJeune> {
	const { vieProfessionnelle, aidesFinancieres, accompagnement, orienterFormer } = response;
	const filteredMesuresJeunes = { accompagnement, aidesFinancieres, orienterFormer, vieProfessionnelle };
	return Object.entries(filteredMesuresJeunes).flatMap(([strapiMesureJeuneCategory, strapiMesureJeuneListByCatégorie]) => {
		return strapiMesureJeuneListByCatégorie.map((strapiMesureJeune: Strapi.SingleType.LesMesuresJeunes.MesureJeune) => {
			return mapServiceJeune(strapiMesureJeune, strapiMesureJeuneCategory as keyof Strapi.SingleType.LesMesuresJeunes);
		});
	});
}

function mapServiceJeune(response: Strapi.SingleType.LesMesuresJeunes.MesureJeune, catégorie: keyof Strapi.SingleType.LesMesuresJeunes): ServiceJeune {
	const article = flatMapSingleRelation(response.article, mapArticle);
	return {
		article,
		banniere: flatMapSingleImage(response.banniere),
		categorie: mapServiceJeuneCategorie(catégorie),
		concerne: response.pourQui,
		contenu: response.contenu,
		extraitContenu: getExtraitContenu(response.contenu, 110),
		link: article ? `/articles/${article.slug}` : response.url,
		titre: response.titre,
		url: response.url,
	};
}

function mapServiceJeuneCategorie(mesureJeuneKey: keyof Strapi.SingleType.LesMesuresJeunes): ServiceJeune.Categorie {
	switch (mesureJeuneKey) {
		case 'accompagnement':
			return ServiceJeune.Categorie.ACCOMPAGNEMENT;
		case 'orienterFormer':
			return ServiceJeune.Categorie.ORIENTATION_FORMATION;
		case 'vieProfessionnelle':
			return ServiceJeune.Categorie.ENTREE_VIE_PROFESSIONELLE;
		case 'aidesFinancieres':
			return ServiceJeune.Categorie.AIDES_FINANCIERES;
	}
}

function flatMapSingleImage(response: Strapi.SingleRelation<Strapi.Image> | undefined): Image | undefined {
	if (!response?.data) {
		return undefined;
	}
	return {
		alt: response.data.attributes.alternativeText || '',
		src: response.data.attributes.url,
	};
}
