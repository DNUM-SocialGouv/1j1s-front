import Image from 'next/image';
import React from 'react';

import { LienSolution } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
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
    <Link href={lienOffre} className={styles.card} prefetch={false} data-testid="RésultatRechercherSolution" canGoBack={true}>
      <header className={styles.cardHeader}>
        <div className={styles.cardImageWrapper}>
          <Image alt="" src={logoEntreprise} layout="fill" />
        </div>
        <div className={styles.offreLead}>
          <div>
            <div className={styles.offreLeadTitle}>{intituléOffre}</div>
            <div className={styles.offreLeadSubTitle}>{nomEntreprise && nomEntreprise}</div>
          </div>
          { !isSmallScreen && cardDescription()}

        </div>
      </header>
      { isSmallScreen && cardDescription()}
    </Link>
  );
}
