import Image from 'next/legacy/image';
import illustration from 'public/images/CEJ/what-it-is.png';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/QuEstCeQueCest/QuEstCeQueCEst.module.scss';
import Marked from '~/client/components/ui/Marked/Marked';



const contenu = `
Le Contrat d'Engagement Jeune, qu'est-ce que c'est ?
----------------------------------------------------

_Un parcours entièrement personnalisé qui peut durer de 6 à 12 mois*_ en fonction de mon profil, pour m'aider à définir mon projet professionnel et à trouver un emploi.

Quand je signe mon contrat, je bénéficie de :

+ **Un accompagnement personnalisé avec un conseiller dédié** qui me suit tout au long de mon parcours et jusqu'à ce que j'accède à un emploi durable
+ **Un programme intensif** de 15 à 20 heures par semaine composé de différents types d'activités
+ **Une allocation pouvant aller jusqu'à 500 euros par mois** en fonction de mes ressources et à condition que je respecte mes engagements

<sub>(*) La durée de l'accompagnement peut exceptionnellement aller jusqu'à 18 mois</sub>
`;



export default function QuEstCeQueCEst() {
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
