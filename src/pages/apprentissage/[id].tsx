import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreAlternance } from '~/client/components/features/Alternance/Consulter/ConsulterOffreAlternance';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import {
  Alternance,
  AlternanceId,
  IdeaType,
} from '~/server/alternances/domain/alternance';
import { AlternanceNotFoundException } from '~/server/alternances/domain/alternanceNotFound.exception';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

interface ConsulterOffreAlternancePageProps {
  offreAlternance: Alternance;
}

export default function ConsulterOffreAlternancePage(props: ConsulterOffreAlternancePageProps) {
  const { offreAlternance } = props;

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
  const ideaType = split[0] as IdeaType;
  const alternanceId = split[1] as AlternanceId;
  const offreAlternance = await dependencies.alternanceDependencies.consulterOffreAlternance.handle(alternanceId, ideaType);
  if (!offreAlternance) {
    throw new AlternanceNotFoundException(alternanceId, ideaType);
  }

  return {
    props: {
      offreAlternance: JSON.parse(JSON.stringify(offreAlternance)),
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
