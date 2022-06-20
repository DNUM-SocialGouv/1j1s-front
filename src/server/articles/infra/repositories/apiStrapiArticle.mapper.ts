import { Article } from '~/server/articles/domain/article';
import { Strapi } from '~/server/articles/infra/repositories/apiStrapiArticle.response';
import { parseMarkdown } from '~/server/services/utils/markdown.util';

export function mapArticle(articleResponse: Strapi.ArticleContentType): Article | undefined {
  if (articleResponse.data.length === 0) return undefined;
  const { banniere, contenu, slug, titre } = articleResponse.data[0].attributes;
  return {
    banniere: banniere?.data.attributes,
    contenu: parseMarkdown(contenu || ''),
    slug,
    titre,
  };
}
