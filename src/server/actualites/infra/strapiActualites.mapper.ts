import { Actualite } from '~/server/actualites/domain/actualite';
import { StrapiListeActualites } from '~/server/actualites/infra/strapiActualites';
import { mapArticle } from '~/server/articles/infra/strapiArticle.mapper';
import {
	flatMapSingleImage,
	flatMapSingleRelation,
	getExtraitContenu,
} from '~/server/cms/infra/repositories/strapi.utils';

export function mapStrapiListeActualites(strapiListeActualités: StrapiListeActualites.ListeActualites): Array<Actualite> {
	return strapiListeActualités.listeActualites.map((strapiActualité) => {
		const article = strapiActualité.article && flatMapSingleRelation(strapiActualité.article);
		return {
			article: article && mapArticle(article),
			bannière: flatMapSingleImage(strapiActualité.banniere),
			contenu: strapiActualité.contenu,
			extraitContenu: getExtraitContenu(strapiActualité.contenu, 110),
			link: article ? `/articles/${article.slug}` : strapiActualité.url,
			titre: strapiActualité.titre,
		};
	});
}

