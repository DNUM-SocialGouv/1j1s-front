import Image from 'next/image';
import React, { useState } from 'react';

import styles from './LesEntreprisesSEngagentInscription.module.scss';


export default function LesEntreprisesSEngagentInscription() {
  const [etape, setEtape] = useState<1 | 2>(1);


  function displayEtape() {
    if(etape === 1) {
      return 'Etape 1 sur 2';
    }
    return 'Etape 2 sur 2';
  }

  return (
    <>
      <div className={styles.heading}>
        <Image src="/images/logos/france-relance.svg" alt="" width="65" height="65" />
        <span>Les entreprises s&apos;engagent</span>
      </div>
      <div className={styles.etape}>
        {displayEtape()}
      </div>
      <form>
        <div className={styles.premierePartieFormulaire}>

        </div>
        <div className={styles.deuxiemePartieFormulaire}>

        </div>
      </form>
    </>
  );

}
