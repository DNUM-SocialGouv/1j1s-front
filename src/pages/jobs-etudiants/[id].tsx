import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreEmploi } from '~/client/components/features/OffreEmploi/Consulter/ConsulterOffreEmploi';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { OffreEmploi, OffreEmploiId } from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';

interface ConsulterJobEtudiantPageProps {
  jobEtudiant: OffreEmploi;
}

export default function ConsulterJobEtudiantPage({ jobEtudiant }: ConsulterJobEtudiantPageProps) {
  if (!jobEtudiant) return null;

  return (
    <>
      <HeadTag title={`${jobEtudiant.intitulé} | 1jeune1solution`} />
      <ConsulterOffreEmploi offreEmploi={jobEtudiant} />
    </>
  );
}

interface EmploiContext extends ParsedUrlQuery {
  id: OffreEmploiId;
}

export async function getStaticProps(context: GetStaticPropsContext<EmploiContext>): Promise<GetStaticPropsResult<ConsulterJobEtudiantPageProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }
  const { id } = context.params;
  const offreEmploi = await dependencies.offreEmploiDependencies.consulterOffreEmploi.handle(id);

  if (offreEmploi.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }

  return {
    props: {
      jobEtudiant: JSON.parse(JSON.stringify(offreEmploi.result)),
    },
    revalidate: 86400,
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    fallback: 'blocking',
    paths: [],
  };
}
