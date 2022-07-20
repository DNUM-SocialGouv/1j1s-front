import Image from 'next/image';
import React from 'react';

import Marked from '~/client/components/ui/Marked/Marked';
import styles from '~/pages/contrat-engagement-jeune/Allocations.module.scss';

import illustration from '../../../public/images/CEJ/benefit-from-it.png';

const contenu = `
Est-ce que je peux bénéficier de l’allocation ?
-----------------------------------------------

Je perçois une allocation pouvant aller jusqu’à 500 euros par mois en fonction de : 

+ **Mon âge**
+ **Mes ressources**
+ **Mon statut** (si je suis détaché fiscalement ou si je suis rattaché fiscalement à un foyer aux revenus modestes)
+ Du respect de mes **engagements**
`;

export default function Allocations() {
  return (
    <section className={ styles.section }>
      <div className={ styles.container }>
        <aside className= { styles.illustration }>
          <Image src={ illustration } objectFit='cover' layout='fill' alt='' />
        </aside>
        <article className={ styles.article }>
          <Marked markdown={ contenu }/>
        </article>
      </div>
    </section>
  );
}
