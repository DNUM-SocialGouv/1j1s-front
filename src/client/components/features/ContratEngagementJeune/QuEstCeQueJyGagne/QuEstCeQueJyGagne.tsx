import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/QuEstCeQueJyGagne/QuEstCeQueJyGagne.module.scss';
import Marked from '~/client/components/ui/Marked/Marked';
import { SeeMoreComponent } from '~/client/components/ui/SeeMore/SeeMoreComponent';
import useBreakpoint from '~/client/hooks/useBreakpoint';


const contenu = `
  **Quand je m'engage, je prépare mon avenir et je mets toutes les chances de mon côté pour :**
  + Définir et bâtir un **projet professionnel durable**
  + Mettre en valeur **mes talents et mes compétences**
  + **Découvrir le monde professionnel** et comprendre son fonctionnement et ses codes
  + **Construire mon réseau** pour trouver plus facilement et plus rapidement un emploi
  `;

export default function QuEstCeQueJyGagne() {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const displayAccordion = isSmallScreen || isMediumScreen;

  const markdown = <div className={styles.contenu}><Marked markdown={contenu}/></div>;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titre}>
          <h2>Mais en vrai, qu&apos;est-ce que j&apos;y gagne à long terme ?</h2>
          {!displayAccordion && <strong>Le contrat d&apos;Engagement Jeune, c&apos;est tout bénéf&apos; pour moi !</strong>}
        </div>
        {!displayAccordion && markdown}
        {displayAccordion && <span className={styles.accordion}><SeeMoreComponent> {markdown}</SeeMoreComponent></span>}
      </div>
    </section>
  );
}
