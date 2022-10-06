import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/Entreprendre/EntreprendreCard.module.scss';
import { ItemTagList, TagListWithSeparation } from '~/client/components/features/Entreprendre/TagListWithSeparation';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export interface EntreprendreCardProps {
  logoEntreprise: string
  lienEntreprise: string
  nomEntreprise: string
  intituléEntreprise?: string
  descriptionEntreprise: string
  descriptionPublicConcerné?: string
  étiquettePhaseList: ItemTagList[]
}

export function EntreprendreCard(props: EntreprendreCardProps) {
  const { logoEntreprise, lienEntreprise, nomEntreprise, intituléEntreprise, étiquettePhaseList, descriptionPublicConcerné, descriptionEntreprise } = props;
  const { isSmallScreen } = useBreakpoint();

  return (
    <Link href={lienEntreprise} className={classNames(styles.card, 'underline-none')} prefetch={false}>
      {
        isSmallScreen && <>
          <header className={styles.cardHeader}>
            <div className={styles.cardImageContainer}>
              <div className={styles.cardImageWrapper}>
                <Image alt="" src={logoEntreprise} layout="fill" objectFit="contain"/>
              </div>
            </div>

            <div className={styles.infoEntreprise}>
              <div className={styles.infoEntrepriseTitle}>{nomEntreprise}</div>
              { intituléEntreprise && <div className={styles.infoEntrepriseSubTitle}>{intituléEntreprise}</div> }
            </div>
          </header>
          <section className={styles.cardDescription}>
            {étiquettePhaseList.length > 0 && <TagListWithSeparation separationIcon={<AngleRightIcon />} list={étiquettePhaseList} aria-label="Caractéristiques de l'offre" />}
            {descriptionPublicConcerné && <p className={styles.descriptionPublicConcerne}>{descriptionPublicConcerné}</p>}
            <span className={styles.callToAction}>Découvrir<ExternalRedirectionIcon /></span>
          </section>
        </>
      }
      {
        !isSmallScreen && <>
          <header className={styles.cardHeader}>
            <div className={styles.cardImageContainer}>
              <div className={styles.cardImageWrapper}>
                <Image alt="" src={logoEntreprise} layout="fill" objectFit="contain" />
              </div>
            </div>
          </header>
          <section className={styles.cardDescription}>
            <div className={styles.infoEntreprise}>
              <div className={styles.infoEntrepriseTitle}>{nomEntreprise}</div>
              { intituléEntreprise && <div className={styles.infoEntrepriseSubTitle}>{intituléEntreprise}</div> }
            </div>
            <p className={styles.descriptionEntreprise}>{descriptionEntreprise}</p>
            {étiquettePhaseList.length > 0 && <TagListWithSeparation separationIcon={<AngleRightIcon />} list={étiquettePhaseList} aria-label="Caractéristiques de l'offre" />}
            {descriptionPublicConcerné && <p className={styles.descriptionPublicConcerne}>{descriptionPublicConcerné}</p>}
            <div className={styles.callToAction}>Découvrir<ExternalRedirectionIcon /></div>
          </section>
        </>
      }
    </Link>
  );
}
