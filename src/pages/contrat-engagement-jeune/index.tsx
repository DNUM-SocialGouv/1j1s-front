import { Icon } from '@dataesr/react-dsfr';
import Image from 'next/image';
import React from 'react';

import useBreakpoint from '~/client/hooks/useBreakpoint';
import heroStyles from '~/pages/contrat-engagement-jeune/Hero.module.scss';

import heroBannerImage from '../../../public/images/banners/CEJ_banner_hero.jpg';


export default function ContratEngagementJeune() {
  return (
    <Hero />
  );
}

function Hero() {
  const { isLargeScreen, isXLargeScreen } = useBreakpoint();
  const displayImage = isLargeScreen || isXLargeScreen;
  const titre = 'Je découvre le Contrat d\'Engagement Jeune';
  const accroche = 'Finie la galère, trouvez un métier qui va vous plaire.';
  const styles = heroStyles;

  const children = (
    <>
      <h1 className={ styles.titre } >{ titre }</h1>
      { !displayImage && (<p className={ styles.heroAccroche}>{ accroche }</p>) }
      <a href="#" className={ styles.cta }>Je me lance &nbsp;<Icon name="ri-arrow-right-s-line" /></a>
    </>
  );

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroTitle}>
          {children}
        </span>
      </div>
      {displayImage && (
        <div className={styles.heroImage}>
          <Image src={heroBannerImage} priority alt={ accroche } layout="fill" objectFit="contain" objectPosition="right"/>
        </div>
      )}
    </div>
  );
}
