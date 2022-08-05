import { Title } from '@dataesr/react-dsfr';
import classNames from 'classnames';

import styles from '~/client/components/features/Article/ConsulterArticle.module.css';
import useSanitize from '~/client/hooks/useSanitize';
import { Article } from '~/server/cms/domain/article';

interface ConsulterArticleProps {
  article: Article
}

export function ConsulterArticle({ article }: ConsulterArticleProps) {
  const titre = useSanitize(article.titre);
  const bannièreUrl = useSanitize(article.bannière?.url);
  const bannièreAlt = useSanitize(article.bannière?.alt);
  const contenu = useSanitize(article.contenu);

  const createMarkup = (markup: string) => ({ __html: markup });
  
  return (
    <main className={classNames('fr-container', styles.consulterArticle)}>
      <Title as="h1" className={styles.titre}>{titre}</Title>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {bannièreUrl && <img src={bannièreUrl} alt={bannièreAlt} decoding="async" loading="lazy" />}
      <article dangerouslySetInnerHTML={createMarkup(contenu)} />
    </main>
  );
}
