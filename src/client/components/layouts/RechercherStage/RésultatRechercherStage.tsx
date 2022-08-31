import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { LienSolution } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { TagList } from '~/client/components/ui/Tag/TagList';

export function RésultatRechercherStage(props: Omit<LienSolution, 'id'>) {
  const { lienOffre, intituléOffre, logoEntreprise, nomEntreprise, étiquetteOffreList } = props;

  return (
    <Link href={lienOffre} prefetch={false}>
      <a className={styles.card} data-testid="RésultatRechercherSolution">
        <header className={styles.cardHeader}>
          <Image alt="" src={logoEntreprise} width="56" height="56" />
          <div className={styles.offreLead}>
            <div>{intituléOffre}</div>
            {nomEntreprise && <div>{nomEntreprise}</div>}
          </div>
        </header>
        <section className={styles.cardBody}>
          {étiquetteOffreList.length > 0 && <TagList list={étiquetteOffreList} aria-label="Caractéristiques de l'offre" />}
          <span className={styles.callToAction}>
            En savoir plus
            <Icon name="angle-right" />
          </span>
        </section>
      </a>
    </Link>
  );
}
