import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterFicheMetier } from '~/client/components/features/FicheMetier/ConsulterFicheMetier';
import { Container } from '~/client/components/layouts/Container/Container';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { dependencies } from '~/server/start';

import styles from './decouvrir-les-metiers.module.scss';

interface ConsulterFicheMetierPageProps {
	ficheMetier: FicheMétier
}

export default function ConsulterFicheMetierPage({ ficheMetier }: ConsulterFicheMetierPageProps) {
  if (!ficheMetier) return null;

  return (
    <>
      <HeadTag title={`${ficheMetier.nomMetier.charAt(0).toUpperCase()}${ficheMetier.nomMetier.slice(1)} | 1jeune1solution`} />
      <main id="contenu">
        <Container className={styles.container}>
          <ConsulterFicheMetier ficheMetier={ficheMetier} />
        </Container>
      </main>
    </>
  );
}

interface FicheMetierContext extends ParsedUrlQuery {
	id: string
}

export async function getStaticProps(context: GetStaticPropsContext<FicheMetierContext>): Promise<GetStaticPropsResult<ConsulterFicheMetierPageProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }

  const { id } = context.params;
  const response = await dependencies.cmsDependencies.consulterFicheMetier.handle(id);

  if (response.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }
	
  return {
    props: {
      ficheMetier: JSON.parse(JSON.stringify(response.result)),
    },
    revalidate: 86400,
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    fallback: true,
    paths: [],
  };
}
