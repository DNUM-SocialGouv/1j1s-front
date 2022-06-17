import { Article } from '~/server/articles/domain/article';
import { Strapi } from '~/server/articles/infra/repositories/apiStrapiArticle.response';
import { parseMarkdown } from '~/server/services/utils/markdown.util';

export function mapArticle(articleResponse: Strapi.ArticleContentType): Article | undefined {
  if (articleResponse.data.length === 0) return undefined;
  return {
    contenu: parseMarkdown(articleResponse.data[0].attributes.contenu || ''),
    image: articleResponse.data[0].attributes.image?.data.attributes,
    slug: articleResponse.data[0].attributes.slug,
    titre: articleResponse.data[0].attributes.titre,
  };
}
