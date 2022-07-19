import React from 'react';

import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import styles from '~/pages/contrat-engagement-jeune/PkCPourMoi.module.scss';


export default function PkCPourMoi() {
  const arrow = <span className={styles.arrow}><ArrowRightIcon color={'white'}/></span>;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.titre}>Le Contrat d&apos;Engagement Jeune est fait pour moi si :</h2>
        <ul className={styles.liste}>
          <li>{arrow} <span><strong>J&apos;ai entre 16 et 25 ans</strong> (moins de 30 si je suis en situation de handicap)</span></li>
          <li>{arrow} <span><strong>Je suis sans emploi ni formation</strong></span></li>
          <li>{arrow} <span><strong>Je n&apos;ai pas de projet professionnel défini</strong> et j&apos;ai perdu confiance en moi</span></li>
          <li>{arrow} <span><strong>J&apos;ai fait face à des difficultés matérielles et financières</strong></span></li>
          <li>{arrow} <span><strong>Je suis prêt(e) à m&apos;engager</strong> à suivre le programme</span></li>
        </ul>
      </div>
    </section>
  );
}

