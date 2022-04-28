import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { EmploiNotFoundException } from '~/server/offresEmploi/domain/emploiNotFound.exception';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';

interface EmploiProps {
  offreEmploi: OffreEmploi;
}

export default function EmploiDetails(props: EmploiProps) {
  const { offreEmploi } = props;
  return <div>{offreEmploi?.intitulé}</div>;
}

interface EmploiContext extends ParsedUrlQuery {
  id: string;
}

export async function getStaticProps(context: GetStaticPropsContext<EmploiContext>): Promise<GetStaticPropsResult<EmploiProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }
  const { id } = context.params;
  const offreEmploi = await dependencies.offreEmploiDependencies.consulterOffreEmploi.handle(id);

  if (!offreEmploi) {
    throw new EmploiNotFoundException(id);
  }

  return {
    props: {
      offreEmploi: JSON.parse(JSON.stringify(offreEmploi)),
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    fallback: true,
    paths: [],
  };
}
