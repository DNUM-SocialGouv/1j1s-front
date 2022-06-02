import { Article } from '~/server/articles/domain/article';

interface ConsulterArticleProps {
  article: Article
}

export function ConsulterArticle({ article }: ConsulterArticleProps) {
  return (
    <div>{article.titre}</div>
  );
}
