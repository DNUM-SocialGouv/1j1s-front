import { Title } from '@dataesr/react-dsfr';

import styles from '~/client/components/features/Article/ConsulterArticle.module.css';
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
    <main className={styles.consulterArticle + ' fr-container'}>
      <Title as="h1" className={styles.titre}>{titre}</Title>
      <article dangerouslySetInnerHTML={createMarkup(contenu)} />
    </main>
  );
}
