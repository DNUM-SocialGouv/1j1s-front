import Image from 'next/image';
import React from 'react';

import { AccordionComponent } from '~/client/components/ui/Accordion/AccordionComponent';
import Marked from '~/client/components/ui/Marked/Marked';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import styles from '~/pages/contrat-engagement-jeune/Allocations.module.scss';

import illustration from '../../../public/images/CEJ/benefit-from-it.png';

const contenu = `
Je perçois une allocation pouvant aller jusqu’à 500 euros par mois en fonction de : 

+ **Mon âge**
+ **Mes ressources**
+ **Mon statut** (si je suis détaché fiscalement ou si je suis rattaché fiscalement à un foyer aux revenus modestes)
+ **Du respect de mes engagements**
`;

export default function Allocations() {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const displayAccordion = isSmallScreen || isMediumScreen;
  return (
    <section className={ styles.section }>
      <div className={ styles.container }>
        <aside className= { styles.illustration }>
          <Image src={ illustration } objectFit='cover' layout='intrinsic' alt='' />
        </aside>
        <article className={ styles.article }>
          <h2 className= { styles.titre }>Est-ce que je peux bénéficier de l&apos;allocation ?</h2>
          {!displayAccordion && <Marked markdown={ contenu }/>}
          {displayAccordion && (<span className={ styles.accordion }><AccordionComponent>
            <Marked markdown={ contenu }/>
          </AccordionComponent></span>)}
        </article>
      </div>
    </section>
  );
}
