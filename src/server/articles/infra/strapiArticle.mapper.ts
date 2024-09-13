import { Article } from '~/server/articles/domain/article';
import { StrapiArticle } from '~/server/articles/infra/strapiArticle';
import { flatMapSingleImage } from '~/server/cms/infra/repositories/strapi.utils';

export function mapArticle(articleResponse: StrapiArticle): Article {
	return {
		bannière: flatMapSingleImage(articleResponse.banniere),
		contenu: articleResponse.contenu,
		dateDerniereMiseAJour: articleResponse.updatedAt,
		slug: articleResponse.slug,
		titre: articleResponse.titre,
	};
}
