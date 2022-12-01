import { AxiosError } from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreDeStage';
import { OffreDeStageAttributesFromCMS } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import indexServices from '~/client/services/index.service';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';

export default function ConsulterOffreStagePage({ offreDeStage } : ConsulterStagePageProps) {
  const router = useRouter();

  useEffect(()=>{
    window.addEventListener('popstate', () => router.reload() );
    return () => window.removeEventListener('popstate', () => router.reload());
  }, [router]);

  return (
    <>
      <HeadTag title={`${offreDeStage.titre} | 1jeune1solution`} />
      <ConsulterOffreDeStage offreDeStage={offreDeStage}/>
    </>
  );
}

interface StageContext extends ParsedUrlQuery {
  id: string;
}

interface ConsulterStagePageProps {
  offreDeStage: OffreDeStageAttributesFromCMS;
}

export async function getServerSideProps(context: GetServerSidePropsContext<StageContext>): Promise<GetServerSidePropsResult<ConsulterStagePageProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }
  const { id: slug } = context.params;

  try {
    const offreDeStage = await indexServices.offreDeStage.get(slug);;
    return {
      props: {
        offreDeStage,
      },
    };
  } catch (e) {
    const error: AxiosError | Error = e as AxiosError | Error;
    if (error instanceof AxiosError && error.response?.status === 404) {
      return { notFound: true };
    }
    throw e;
  }
}
