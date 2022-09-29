import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/JeRecrute/DecouvrirMesuresEmployeurs/DecouvrirMesuresEmployeurs.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';

export default function DecouvrirMesuresEmployeurs() {
  return (
    <section className={ styles.section }>
      <div className={ styles.sectionContainer }>
        <aside className= { styles.sectionContainerIllustration }>
          <Image src="/icons/decouverteMesuresEmployeurs.svg" objectFit='cover' layout='fill' alt='' />
        </aside>
        <article className={ styles.sectionContainerText }>
          <h2 className={styles.sectionContainerTextTitre}>Découvrez les mesures du plan 1jeune1solution pour vous aider
            <span className={styles.sectionContainerTextTitreAccroche}> à recruter plus facilement</span>
          </h2>
          <LinkAsButton
            href="/mesures-employeurs"
          >
            Découvrir toutes les mesures employeurs
            <Icon name={'angle-right'}/>
          </LinkAsButton>
        </article>
      </div>
    </section>
  );
}
