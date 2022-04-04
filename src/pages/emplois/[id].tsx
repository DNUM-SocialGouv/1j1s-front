import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";

import { OffreEmploi } from "../../server/offreemplois/domain/OffreEmploi";
import { dependencies } from "../../server/start";

interface EmploiProps {
  offreEmploi: OffreEmploi;
}

export default function EmploiDetails(props: EmploiProps) {
  const { offreEmploi } = props;
  return <div>{JSON.stringify(offreEmploi)}</div>;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<EmploiProps>> {
  const id = context.params!["id"] as string;
  const offreEmplois =
    await dependencies.offreEmploiDependencies.listeOffreEmploi.handle();
  const offreEmploi = offreEmplois.find(
    (offreEmploi: OffreEmploi) => offreEmploi.id === id
  )!;

  return {
    props: {
      offreEmploi,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<any>> {
  return {
    fallback: true,
    paths: [],
  };
}
