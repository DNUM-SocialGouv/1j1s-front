import { Tag } from '@dataesr/react-dsfr';
import Link from 'next/link';
import React from 'react';

import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import styles from '~/styles/CardOffreEmploi.module.css';

interface CardOffreEmploiProps {
  offreEmploi: OffreEmploi;
}

export const CardOffreEmploi = (props: CardOffreEmploiProps) => {
  const { offreEmploi } = props;
  return (
    <Link href={'/emplois/' + offreEmploi.id}>
      <a className={styles.card}>
        <div className={styles.cardHeader}>
          <img alt="" src="/images/france-relance.svg" width="48" height="48" />
          <div>
            <strong> {offreEmploi.intitulé} </strong>
            <p> {offreEmploi.entreprise?.nom ?? 'NOM ENTREPRISE'} </p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <ul className={styles.tagList}>
            <li>
              <Tag>{offreEmploi.expérience}</Tag>
            </li>
            <li>
              <Tag>{offreEmploi.typeContrat}</Tag>
            </li>
            <li>
              <Tag>{offreEmploi.duréeTravail}</Tag>
            </li>
          </ul>
          <p>
            <strong>Description:</strong>{' '}
            {offreEmploi.description?.slice(0, 100)} [...]
          </p>
          <span className={'align-right'}>
            en savoir plus
            <span
              className="fr-icon-arrow-right-s-line"
              aria-hidden="true"
            ></span>
          </span>
        </div>
      </a>
    </Link>
  );
};
