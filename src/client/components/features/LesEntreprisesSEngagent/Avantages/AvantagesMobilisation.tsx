import Image from 'next/legacy/image';
import illustration from 'public/illustrations/rejoindre-la-mobilisation.svg';
import React from 'react';

import styles from '~/client/components/features/LesEntreprisesSEngagent/Avantages/AvantagesMobilisation.module.scss';
import Marked from '~/client/components/ui/Marked/Marked';

const contenu = `
Quels avantages à rejoindre la mobilisation pour les jeunes ?
------------------------------------------------------------
+ Mettez en avant tous vos engagements pour les jeunes en créant votre page dédiée
+ Publiez vos offres d’emploi sur la plateforme
+ Bénéficiez d’un accompagnement par un Conseiller Pôle Emploi (rappel sous 72h)
+ Relayez vos engagements par intermédiaire d’un kit de communication #1jeune1solution
`;

export default function AvantagesMobilisation() {
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
