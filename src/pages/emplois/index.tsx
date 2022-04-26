import Link from 'next/link';

import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

export default function Emplois() {
  const offreEmplois: OffreEmploi[] = [];
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
      }}
    >
      {offreEmplois.map((offreEmploi: OffreEmploi) => {
        return (
          <Link key={offreEmploi.id} href={'/emplois/' + offreEmploi.id}>
            <a
              style={{
                background: 'blueviolet',
                color: 'black',
                height: 150,
                margin: 10,
                padding: 5,
                textAlign: 'center',
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
