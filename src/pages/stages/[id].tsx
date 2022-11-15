import { AxiosError } from 'axios';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreDeStage';
import { OffreDeStageAttributesFromCMS } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import indexServices from '~/client/services/index.service';

const ONE_HOUR_IN_SECONDS = 3600;
const REVALIDATE_CACHE_TIME = ONE_HOUR_IN_SECONDS;
const NEXT_NOT_FOUND_PAGE = { notFound: true, revalidate: 1 } as GetStaticPropsResult<ConsulterStagePageProps>;


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

export async function getStaticProps(context: GetStaticPropsContext<StageContext>): Promise<GetStaticPropsResult<ConsulterStagePageProps>> {
  const { id: slug } = context.params as { id: string };

  try {
    const offreDeStage = await indexServices.offreDeStage.get(slug);;
    return {
      props: {
        offreDeStage,
      },
      revalidate: REVALIDATE_CACHE_TIME,
    };
  } catch (e) {
    const error: AxiosError | Error = e as AxiosError | Error;
    if (error instanceof AxiosError && error.response?.status === 404) {
      return NEXT_NOT_FOUND_PAGE;
    }
    throw e;
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {

  const slugs = await indexServices.offreDeStage.listeTousLesSlugs();
  return {
    fallback: 'blocking',
    paths: [
      ...slugs.map((slug) => ({ params: { id: slug } })),
    ],
  };
}
