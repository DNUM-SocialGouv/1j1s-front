import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";

import { PageContextParamsError } from "~/server/errors/pageContextParams.error";
import { EmploiNotFoundError } from "~/server/offresEmploi/domain/emploiNotFound.error";
import { OffreEmploi } from "~/server/offresEmploi/domain/offreEmploi";
import { dependencies } from "~/server/start";

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
  context: GetStaticPropsContext<EmploiContext>
): Promise<GetStaticPropsResult<EmploiProps>> {
  if (!context.params) {
    throw new PageContextParamsError();
  }
  const { id } = context.params;
  const offreEmplois =
    await dependencies.offreEmploiDependencies.listeOffreEmploi.handle();
  const offreEmploi = offreEmplois.find(
    (offreEmploi: OffreEmploi) => offreEmploi.id === id
  );

  if (!offreEmploi) {
    throw new EmploiNotFoundError(id);
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
