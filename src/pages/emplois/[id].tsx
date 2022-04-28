import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { EmploiNotFoundException } from '~/server/offresEmploi/domain/emploiNotFound.exception';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

interface EmploiProps {
  offreEmploi: OffreEmploi;
}

export default function EmploiDetails(props: EmploiProps) {
  const { offreEmploi } = props;
  return <div>{JSON.stringify(offreEmploi)}</div>;
}

interface EmploiContext extends ParsedUrlQuery {
  id: string;
}

export async function getStaticProps(
  context: GetStaticPropsContext<EmploiContext>,
): Promise<GetStaticPropsResult<EmploiProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }
  const { id } = context.params;
  const offreEmploi: OffreEmploi = {
    description: 'Toto',
    duréeTravail: OffreEmploi.DuréeTravail.TEMPS_PLEIN,
    entreprise: {
      nom: 'Toto',
    },
    expérience: OffreEmploi.Expérience.EXPERIENCE_SOUHAITEE,
    id,
    intitulé: 'Offre Emploi',
    lieuTravail: 'Paris',
    typeContrat: OffreEmploi.TypeContrat.MIS,
  };

  if (!offreEmploi) {
    throw new EmploiNotFoundException(id);
  }

  return {
    props: {
      offreEmploi,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    fallback: true,
    paths: [],
  };
}
