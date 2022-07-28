import Image from 'next/image';
import illustration from 'public/images/CEJ/benefit-from-it.png';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Allocations/Allocations.module.scss';
import Marked from '~/client/components/ui/Marked/Marked';
import { SeeMoreComponent } from '~/client/components/ui/SeeMore/SeeMoreComponent';
import useBreakpoint from '~/client/hooks/useBreakpoint';

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
    <section className={ styles.allocations }>
      <div className={ styles.allocationsContainer }>
        <aside className= { styles.allocationsIllustration }>
          <Image src={ illustration } objectFit='cover' alt='' />
        </aside>
        <article className={ styles.allocationsArticle }>
          <h2 className={ styles.allocationsArticle__Title }>Est-ce que je peux bénéficier de l&apos;allocation ?</h2>
          {!displayAccordion && <Marked markdown={ contenu }/>}
          {displayAccordion && (
            <SeeMoreComponent>
              <Marked markdown={ contenu }/>
            </SeeMoreComponent>)}
        </article>
      </div>
    </section>
  );
}
