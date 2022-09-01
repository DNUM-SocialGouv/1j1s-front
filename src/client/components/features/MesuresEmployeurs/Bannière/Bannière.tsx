import Image from 'next/image';
import bannièreImage from 'public/images/mesuresEmployeurs/mesuresEmployeurs.png';
import React from 'react';

import styles from '~/client/components/features/MesuresEmployeurs/Bannière/Bannière.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';


export default function Bannière () {
  const { isLargeScreen } = useBreakpoint();
  const titre = 'Mesures Employeurs';

  return (
    <div className={styles.bannière}>
      <div className={styles.bannièreContent}>
        <span className={styles.bannièreContentTitle}>
          <h1 className={ styles.bannièreContentTitleTitre }>Employeurs, découvrez toutes les mesures du plan 1 jeune 1 solution pour vous aider à
            <span className={ styles.bannièreContentTitleTitreAccroche }> recruter plus facilement</span>
          </h1>
        </span>
      </div>
      {isLargeScreen && (
        <div className={ styles.bannièreImage }>
          <Image
            priority
            src={bannièreImage}
            alt={ titre }
            layout="fill"
            objectFit="contain"
            objectPosition="right"
          />
        </div>
      )}
    </div>
  );
}

