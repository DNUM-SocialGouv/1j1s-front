import { Icon } from '@dataesr/react-dsfr';
import Image from 'next/image';
import React from 'react';

import useBreakpoint from '~/client/hooks/useBreakpoint';
import bannièreStyles from '~/pages/contrat-engagement-jeune/Bannière.module.scss';

import bannièreImage from '../../../public/images/banners/CEJ_bannière.jpg';


export default function ContratEngagementJeune() {
  return (
    <Bannière />
  );
}

function Bannière () {
  const { isLargeScreen, isXLargeScreen } = useBreakpoint();
  const displayImage = isLargeScreen || isXLargeScreen;
  const titre = 'Je découvre le Contrat d\'Engagement Jeune';
  const accroche = 'Finie la galère, trouvez un métier qui va vous plaire.';
  const styles = bannièreStyles;

  const children = (
    <>
      <h1 className={ styles.titre } >{ titre }</h1>
      { !displayImage && (<p className={ styles.bannièreAccroche}>{ accroche }</p>) }
      <a href="#" className={ styles.cta }>Je me lance &nbsp;<Icon name="ri-arrow-right-s-line" /></a>
    </>
  );

  return (
    <div className={styles.bannière}>
      <div className={styles.bannièreContent}>
        <span className={styles.bannièreTitle}>
          {children}
        </span>
      </div>
      {displayImage && (
        <div className={styles.bannièreImage}>
          <Image
            priority
            src={bannièreImage}
            alt={ accroche }
            layout="fill"
            objectFit="contain"
            objectPosition="right"
          />
        </div>
      )}
    </div>
  );
}
