import { GetStaticPropsResult } from "next";
import Link from "next/link";

import { OffreEmploi } from "../../server/offreemplois/domain/OffreEmploi";
import { dependencies } from "../../server/start";

interface EmploisProps {
  offreEmplois: OffreEmploi[];
}

export default function Emplois(props: EmploisProps) {
  const { offreEmplois } = props;
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
      }}
    >
      {offreEmplois.map((offreEmploi: OffreEmploi) => {
        return (
          <Link key={offreEmploi.id} href={"/emplois/" + offreEmploi.id}>
            <a
              style={{
                background: "blueviolet",
                color: "black",
                height: 150,
                margin: 10,
                padding: 5,
                textAlign: "center",
                width: 200,
              }}
            >
              {offreEmploi.intitule}
            </a>
          </Link>
        );
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
