import Image from 'next/image';
import bannièreImage from 'public/images/banners/CEJ_bannière.jpg';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Bannière/Bannière.module.scss';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';


export default function Bannière () {
  const { isLargeScreen, isXLargeScreen } = useBreakpoint();
  const displayImage = isLargeScreen || isXLargeScreen;
  const titre = 'Je découvre le Contrat d\'Engagement Jeune';
  const accroche = 'Finie la galère, trouvez un métier qui va vous plaire.';

  return (
    <div className={styles.bannière}>
      <div className={styles.bannièreContent}>
        <span className={styles.bannièreTitle}>
          <h1 className={ styles.titre } >{ titre }</h1>
          { !displayImage && (<p className={ styles.bannièreAccroche}>{ accroche }</p>) }
          <a href="#" className={ styles.cta }>Je me lance &nbsp;<AngleRightIcon /></a>
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

