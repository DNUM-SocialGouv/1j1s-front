import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/features/OffreEmploi/RésultatRecherche/RésultatRechercheOffreEmploi.module.css';
import { TagList } from '~/client/components/ui/TagList/TagList';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

interface RésultatRechercheOffreEmploiProps {
  offreEmploi: OffreEmploi;
}

export function RésultatRechercheOffreEmploi (props: RésultatRechercheOffreEmploiProps) {
  const { offreEmploi } = props;
  return (
    <Link href={'/emplois/' + offreEmploi.id}>
      <a className={styles.card}>
        <div className={styles.cardHeader}>
          <Image alt="" src="/images/france-relance.svg" width="48" height="48" />
          <div>
            <strong> {offreEmploi.intitulé} </strong>
            <p> {offreEmploi.entreprise?.nom ?? 'NOM ENTREPRISE'} </p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <TagList list={[offreEmploi.expérience, offreEmploi.typeContrat, offreEmploi.duréeTravail]} />
          <p>
            <strong>Description:</strong>{' '}
            {offreEmploi.description?.slice(0, 100)} [...]
          </p>
          <span className={'align-right'}>
            en savoir plus
            <span
              className="fr-icon-arrow-right-s-line"
              aria-hidden="true"
            />
          </span>
        </div>
      </a>
    </Link>
  );
}
