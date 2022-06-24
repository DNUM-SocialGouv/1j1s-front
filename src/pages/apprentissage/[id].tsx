import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreAlternance } from '~/client/components/features/Alternance/Consulter/ConsulterOffreAlternance';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import {
  AlternanceId,
  From,
} from '~/server/alternances/domain/alternance';
import { RésultatRechercheAlternance } from '~/server/alternances/infra/repositories/alternance.type';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

interface ConsulterOffreAlternancePageProps {
  offreAlternance: RésultatRechercheAlternance;
}

export default function ConsulterOffreAlternancePage({ offreAlternance }: ConsulterOffreAlternancePageProps) {
  if (!offreAlternance) return null;

  return (
    <>
      <HeadTag title={`${offreAlternance.intitulé} | 1jeune1solution`} />
      <ConsulterOffreAlternance offreAlternance={offreAlternance} />
    </>
  );
}

interface AlternanceContext extends ParsedUrlQuery {
  id: string
}

export async function getStaticProps(context: GetStaticPropsContext<AlternanceContext>): Promise<GetStaticPropsResult<ConsulterOffreAlternancePageProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }
  const { id } = context.params;
  const split = id.split('-');
  const from = split[0] as From;
  const alternanceId = split[1] as AlternanceId;
  const offreAlternance = await dependencies.alternanceDependencies.consulterOffreAlternance.handle(alternanceId, from);
  if (offreAlternance.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }

  return {
    props: {
      offreAlternance: JSON.parse(JSON.stringify(offreAlternance.result)),
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
