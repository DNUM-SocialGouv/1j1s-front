import React from 'react';

import styles from '~/client/components/features/MesuresEmployeurs/Bannière/Bannière.module.scss';
import { Hero } from '~/client/components/ui/Hero/Hero';


export default function Bannière () {

  return (
    <Hero className={styles.bannière} image="/illustrations/mesures-employeurs.svg" ariaHidden>
      <span>Employeurs, découvrez toutes les mesures du plan 1 jeune 1 solution pour vous aider à</span>
      <span> recruter plus facilement</span>
    </Hero>
  );
}
