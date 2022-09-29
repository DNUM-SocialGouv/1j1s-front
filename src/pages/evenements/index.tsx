import Image from 'next/image';
import React from 'react';

import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { HeadTag } from '~/client/components/utils/HeaderTag';

import styles from './evenements.module.scss';

export default function PageEvenements() {
  return (
    <>
      <HeadTag title={'Trouver un évènement Emploi | 1jeune1solution'} />
      <main id='contenu'>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              <span className={styles.titlePrimaryText}>Des centaines d&apos;événements de recrutement </span>
              <span className={styles.titleSecondaryText}>pour tous les jeunes, partout en France</span>
            </h1>
            <p className={styles.description}>
              À la recherche d’un emploi ou d’une formation ?
              Dépassez les frontières du virtuel en allant directement à la rencontre de votre futur employeur,
              en participant à des ateliers thématiques ou en assistant à une conférence près de chez vous !
            </p>
            <LinkAsButton className={styles.cta} href='https://mesevenementsemploi.pole-emploi.fr/mes-evenements-emploi/evenements'>
                Je trouve un événement
            </LinkAsButton>
          </div>
          <div className={styles.imageContent}>
            <Image src='/images/homepage/evenements.webp' alt='' layout='fill' objectFit='cover' />
          </div>
        </div>
      </main>
    </>
  );
}
