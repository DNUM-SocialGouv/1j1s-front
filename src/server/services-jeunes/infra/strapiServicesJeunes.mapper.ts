import {
	flatMapSingleRelation,
	getExtraitContenu,
	mapArticle,
} from '~/server/cms/infra/repositories/strapi.mapper';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
import { MesuresJeunes } from '~/server/services-jeunes/infra/strapiMesuresJeunes';

export function mapServiceJeuneList(response:  MesuresJeunes.MesuresJeunes): Array<ServiceJeune> {
	const { vieProfessionnelle, aidesFinancieres, accompagnement, orienterFormer } = response;
	const filteredMesuresJeunes = { accompagnement, aidesFinancieres, orienterFormer, vieProfessionnelle };
	return Object.entries(filteredMesuresJeunes).flatMap(([strapiMesureJeuneCategory, strapiMesureJeuneListByCatégorie]) => {
		return strapiMesureJeuneListByCatégorie.map((strapiMesureJeune: MesuresJeunes.MesureJeune) => {
			return mapServiceJeune(strapiMesureJeune, strapiMesureJeuneCategory as keyof MesuresJeunes.MesuresJeunes);
		});
	});
}

function mapServiceJeune(response: MesuresJeunes.MesureJeune, catégorie: keyof MesuresJeunes.MesuresJeunes): ServiceJeune {
	const article = flatMapSingleRelation<Strapi.CollectionType.Article>(response.article);
	const banniere = flatMapSingleRelation<Strapi.Image>(response.banniere);

	return {
		article: article && mapArticle(article),
		banniere: banniere && {
			alt: banniere.alternativeText || '',
			src: banniere.url,
		},
		categorie: mapServiceJeuneCategorie(catégorie),
		concerne: response.pourQui,
		contenu: response.contenu,
		extraitContenu: getExtraitContenu(response.contenu, 110),
		link: article ? `/articles/${article.slug}` : response.url,
		titre: response.titre,
		url: response.url,
	};
}

function mapServiceJeuneCategorie(mesureJeuneKey: keyof MesuresJeunes.MesuresJeunes): ServiceJeune.Categorie {
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
