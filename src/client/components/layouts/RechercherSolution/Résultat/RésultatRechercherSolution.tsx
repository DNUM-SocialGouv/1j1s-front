import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { LienSolution } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function RésultatRechercherSolution(props: Omit<LienSolution, 'id'>) {
  const { lienOffre, intituléOffre, logoEntreprise, nomEntreprise, étiquetteOffreList } = props;
  const { isSmallScreen } = useBreakpoint();

  const cardDescription = () => {
    return (
      <section className={styles.cardDescription}>
        {étiquetteOffreList.length > 0 && <TagList list={étiquetteOffreList} aria-label="Caractéristiques de l'offre" />}
        <span className={styles.callToAction}>
            En savoir plus
          <Icon name="angle-right" />
        </span>
      </section>
    );
  };
  return (
    <Link href={lienOffre} prefetch={false}>
      <a className={styles.card} data-testid="RésultatRechercherSolution">
        <header className={styles.cardHeader}>
          <div className={styles.cardImageWrapper}>
            <Image alt="" src={logoEntreprise} layout="fill" />
          </div>
          <div className={styles.offreLead}>
            <div>
              <div className="bold">{intituléOffre}</div>
              {nomEntreprise && <div>{nomEntreprise}</div>}
            </div>
            { !isSmallScreen && cardDescription()}

          </div>
        </header>
        { isSmallScreen && cardDescription()}
      </a>
    </Link>
  );
}
