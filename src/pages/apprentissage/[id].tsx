import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreAlternance } from '~/client/components/features/Alternance/Consulter/ConsulterOffreAlternance';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { AlternanceId, From } from '~/server/alternances/domain/alternance';
import { ConsulterOffreAlternanceMatcha } from '~/server/alternances/infra/repositories/alternance.type';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

interface ConsulterOffreAlternancePageProps {
  alternanceFromMatcha: ConsulterOffreAlternanceMatcha;
}

export default function ConsulterOffreAlternancePage({ alternanceFromMatcha }: ConsulterOffreAlternancePageProps) {
  if (!alternanceFromMatcha) return null;

  return (
    <>
      <HeadTag title={`${alternanceFromMatcha.intitulé} | 1jeune1solution`} />
      <ConsulterOffreAlternance offreAlternance={alternanceFromMatcha} />
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
      alternanceFromMatcha: JSON.parse(JSON.stringify(offreAlternance.result)),
    },
    revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
  };
}
