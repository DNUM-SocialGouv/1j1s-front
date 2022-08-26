import classNames from 'classnames';

import styles from '~/client/components/features/Article/ConsulterArticle.module.css';
import Marked from '~/client/components/ui/Marked/Marked';
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

  return (
    <main className={classNames('fr-container', styles.consulterArticle)}>
      <h1 className={styles.titre}>{titre}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {bannièreUrl && <img src={bannièreUrl} alt={bannièreAlt} decoding="async" loading="lazy" />}
      <Marked markdown={contenu} />
    </main>
  );
}
