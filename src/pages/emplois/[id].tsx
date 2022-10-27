import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreEmploi } from '~/client/components/features/OffreEmploi/Consulter/ConsulterOffreEmploi';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { Offre, OffreId } from '~/server/offres/domain/offre';
import { dependencies } from '~/server/start';

interface ConsulterOffreEmploiPageProps {
  offreEmploi: Offre;
}

export default function ConsulterOffreEmploiPage({ offreEmploi }: ConsulterOffreEmploiPageProps) {
  if (!offreEmploi) return null;

  return (
    <>
      <HeadTag title={`${offreEmploi.intitulé} | 1jeune1solution`} />
      <ConsulterOffreEmploi offreEmploi={offreEmploi} />
    </>
  );
}

interface EmploiContext extends ParsedUrlQuery {
  id: OffreId;
}

export async function getStaticProps(context: GetStaticPropsContext<EmploiContext>): Promise<GetStaticPropsResult<ConsulterOffreEmploiPageProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }
  const { id } = context.params;
  const offreEmploi = await dependencies.offreEmploiDependencies.consulterOffreEmploi.handle(id.toUpperCase());

  if (offreEmploi.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }

  return {
    props: {
      offreEmploi: JSON.parse(JSON.stringify(offreEmploi.result)),
    },
    revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    fallback: true,
    paths: [],
  };
}
