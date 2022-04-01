import { GetStaticPropsResult } from "next";
import Link from "next/link";

import { OffreEmploi } from "../../server/offreemplois/domain/OffreEmploi";
import { dependencies } from "../../server/start";

interface EmploisProps {
  offreEmplois: OffreEmploi[];
}

export default function Emplois(props: any) {
  const { offreEmplois } = props;
  return (
    <div style={{ background: "blue" }}>
      {offreEmplois.map((offreEmploi: OffreEmploi) => {
        <Link href={"/emplois/" + offreEmploi.id}>{offreEmploi.intitule}</Link>;
      })}
    </div>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<EmploisProps>
> {
  const offreEmplois =
    await dependencies.offreEmploiDependencies.listeOffreEmploi.handle();

  return {
    props: {
      offreEmplois,
    },
  };
}
