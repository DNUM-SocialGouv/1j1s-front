import { Title } from '@dataesr/react-dsfr';

import styles from '~/client/components/features/Article/ConsulterArticle.module.css';
import useSanitize from '~/client/hooks/useSanitize';
import { Article } from '~/server/articles/domain/article';

interface ConsulterArticleProps {
  article: Article
}

export function ConsulterArticle({ article }: ConsulterArticleProps) {
  const titre = useSanitize(article.titre);
  const banniereUrl = useSanitize(article.banniere?.url);
  const banniereAlt = useSanitize(article.banniere?.alternativeText);
  const contenu = useSanitize(article.contenu);

  const createMarkup = (markup: string) => ({ __html: markup });
  
  return (
    <main className={`${styles.consulterArticle} fr-container`}>
      <Title as="h1" className={styles.titre}>{titre}</Title>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {banniereUrl && <img src={banniereUrl} alt={banniereAlt} decoding="async" loading="lazy" />}
      <article dangerouslySetInnerHTML={createMarkup(contenu)} />
    </main>
  );
}
