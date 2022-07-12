/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';

import styles from '~/pages/contrat-engagement-jeune/Ckoi.module.scss';

import illustration from '../../../public/images/CEJ/what-it-is.png';

export default function Ckoi() {
  return (
    <section className={ styles.section }>
      <div className={ styles.container }>
        <aside className= { styles.illustration }>
          <Image src={ illustration } objectFit='cover' layout='fill' alt='' />
        </aside>
        <article className={ styles.article }>
          <h2>Le Contrat d'Engagement Jeune, qu'est-ce que c'est ?</h2>
          <p><strong>Un parcours entièrement personnalisé qui peut durer de 6 à 12 mois*</strong> en fonction de mon profil, pour m'aider à définir mon projet professionnel et à trouver un emploi.</p>
          <p>Quand je signe mon contrat, je bénéficie de :</p>
          <ul>
            <li><strong>Un accompagnement personnalisé avec un conseiller dédié</strong> qui me suit tout au long de mon parcours et jusqu'à ce que j'accède à un emploi durable</li>
            <li><strong>Un programme intensif</strong> de 15 à 20 heures par semaine composé de différents types d'activités</li>
            <li><strong>Une allocation pouvant aller jusqu'à 500 euros par mois</strong> en fonction de mes ressources et à condition que je respecte mes engagements</li>
          </ul>
          <p>* La durée de l'accompagnement peut exceptionnellement aller jusqu'à 18 mois</p>
        </article>
      </div>
    </section>
  );
}
