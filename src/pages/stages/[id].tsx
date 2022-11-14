import { AxiosError } from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreDeStage';
import {
  OffreDeStageAttributesFromCMS,
  OffreDeStageDétail,
} from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import indexServices from '~/client/services/index.service';

const ONE_DAY_IN_SECONDS = '86400';
const ONE_HOUR_IN_SECONDS = '3600';
const MAX_CACHE_TIME = ONE_DAY_IN_SECONDS;
const REVALIDATE_CACHE_TIME = ONE_HOUR_IN_SECONDS;

const recupérerOffreDeStage = async (slug: string): Promise<OffreDeStageDétail> => indexServices.offreDeStage.get(slug);

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
  const { id } = context.params as { id: string };
  context.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${MAX_CACHE_TIME}, stale-while-revalidate=${REVALIDATE_CACHE_TIME}`,
  );

  try {
    const offreDeStage = await recupérerOffreDeStage(id);
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
