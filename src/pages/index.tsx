import React from 'react';

import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/styles/Accueil.module.css';

export default function Accueil() {

  return (
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes" />
      <main className={styles.main} id="contenu"></main>
    </>
  );
}
