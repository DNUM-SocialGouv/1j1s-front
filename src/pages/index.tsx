import { GetStaticPropsResult } from 'next';
import React from 'react';

import { Article } from '~/client/components/Article';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { PageAccueilArticle } from '~/server/services/cms/infra/repositories/strapiCms.service';
import { dependencies } from '~/server/start';
import styles from '~/styles/Accueil.module.css';

export interface AccueilProps {
  articles: PageAccueilArticle[];
}

export default function Accueil(props: AccueilProps) {
  const { articles } = props;

  return (
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes" />
      <main className={styles.main} id="contenu">
        <section className={styles.articleList}>
          { articles.map((article, index) => (<Article key={index} data={article} />)) }
        </section>
      </main>
    </>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<AccueilProps>> {
  const articles = await dependencies.accueilCMSDependencies.getPageAccueilList();

  return {
    props: {
      articles,
    },
  };
}
