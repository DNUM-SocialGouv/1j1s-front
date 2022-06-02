import { Article } from '~/server/articles/domain/article';
import { ArticleResponse } from '~/server/articles/infra/repositories/apiStrapiArticle.response';

export function mapArticle(articleResponse: ArticleResponse): Article {
  return {
    contenu: articleResponse.data[0].attributes.contenu,
    slug: articleResponse.data[0].attributes.slug,
    titre: articleResponse.data[0].attributes.titre,
  };
}
