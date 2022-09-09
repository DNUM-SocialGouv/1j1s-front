import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { HeadTag } from '~/client/components/utils/HeaderTag';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { dependencies } from '~/server/start';

interface ConsulterFicheMetierPageProps {
	ficheMetier: FicheMétier
}

export default function ConsulterFicheMetierPage({ ficheMetier }: { ficheMetier: FicheMétier }) {
  if (!ficheMetier) return null;

  return (
    <>
      <HeadTag title={`${ficheMetier.nomMetier} | 1jeune1solution`} />
      <div>{JSON.stringify(ficheMetier)}</div>
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
