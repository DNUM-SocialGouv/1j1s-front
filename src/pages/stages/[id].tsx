import axios, { AxiosError } from 'axios';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
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

const ONE_HOUR_IN_SECONDS = 3600;
const REVALIDATE_CACHE_TIME = ONE_HOUR_IN_SECONDS;
const NEXT_NOT_FOUND_PAGE = { notFound: true, revalidate: 1 } as GetStaticPropsResult<ConsulterStagePageProps>;

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

export async function getStaticProps(context: GetStaticPropsContext<StageContext>): Promise<GetStaticPropsResult<ConsulterStagePageProps>> {
  const { id } = context.params as { id: string };

  try {
    const offreDeStage = await recupérerOffreDeStage(id);
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

const recupererSlugsDesStages = async (baseURL: string, page= 1) => {
  const reponse = await axios.get(baseURL + '/api/offres-de-stage/?fields[]=slug&pagination[page]=' + page + '&pagination[pageSize]=255');
  return reponse.data.data.map(({ attributes }: {attributes: OffreDeStageAttributesFromCMS}) => attributes.slug);
};

const recupererTousLesSlugs = async (): Promise<Array<string>> => {
  const baseUrl = 'https://1j1s-stage-content-manager.osc-fr1.scalingo.io';
  let slugs: string[] = [];
  let pageActuelle = 1;

  let nombreDeSlug = 0;
  do {
    nombreDeSlug = slugs.length;
    const results = await recupererSlugsDesStages(baseUrl, pageActuelle);
    slugs = slugs.concat(results);
    pageActuelle++;
  } while (nombreDeSlug !== slugs.length);

  return slugs;
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {

  const slugs = await recupererTousLesSlugs();
  return {
    fallback: 'blocking',
    paths: [
      ...slugs.map((slug) => ({ params: { id: slug } })),
    ],
  };
}
