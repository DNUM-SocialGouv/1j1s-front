import Image from 'next/image';
import React from 'react';

import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import styles from '~/pages/contrat-engagement-jeune/Bannière.module.scss';

import bannièreImage from '../../../public/images/banners/CEJ_bannière.jpg';


export default function Bannière () {
  const { isLargeScreen } = useBreakpoint();
  const titre = 'Je découvre le Contrat d\'Engagement Jeune';
  const accroche = 'Finie la galère, trouvez un métier qui va vous plaire.';

  return (
    <div className={styles.bannière}>
      <div className={styles.bannièreContent}>
        <span className={styles.bannièreTitle}>
          <h1 className={ styles.titre } >{ titre }</h1>
          { !isLargeScreen && (<p className={ styles.bannièreAccroche}>{ accroche }</p>) }
          <a href="#" className={ styles.cta }>Je me lance &nbsp;<AngleRightIcon /></a>
        </span>
      </div>
      {isLargeScreen && (
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

