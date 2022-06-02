import { Title } from '@dataesr/react-dsfr';

import useSanitize from '~/client/hooks/useSanitize';
import { parseMarkdown } from '~/client/utils/markdown.util';
import { Article } from '~/server/articles/domain/article';

interface ConsulterArticleProps {
  article: Article
}

export function ConsulterArticle({ article }: ConsulterArticleProps) {
  const titre = useSanitize(article.titre);
  const contenu = useSanitize(parseMarkdown(article.contenu));

  const createMarkup = (markup: string) => ({ __html: markup });
  
  return (
    <>
      <Title as="h1">{titre}</Title>
      <div dangerouslySetInnerHTML={createMarkup(contenu)}/>
    </>
  );
}
