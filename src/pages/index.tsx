import { GetStaticPropsResult } from 'next';
import React from 'react';

import { Article } from '~/client/components/Article';
import { HeadTag } from '~/client/components/HeaderTag';
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
      <HeadTag
        title="1 jeune 1 solution"
        description="Toutes les solutions pour l'avenir des jeunes"
      />
      <main className={styles.main} id="contenu">
        <Article articles={articles}/>
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
