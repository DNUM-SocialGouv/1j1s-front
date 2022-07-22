import React from 'react';

import { AccordionComponent } from '~/client/components/ui/Accordion/AccordionComponent';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import styles from '~/pages/contrat-engagement-jeune/QuEstCeQueJyGagne.module.scss';


export default function QuEstCeQueJyGagne() {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const displayAccordion = isSmallScreen || isMediumScreen;
  const contenu = <div className={styles.contenu}>
    <strong>Quand je m&apos;engage, je prépare mon avenir et je mets toutes les chances de mon côté pour :</strong>
    <br/><br/>
    <ul>
      <li>Définir et bâtir un <strong>projet professionnel durable</strong></li>
      <li>Mettre en valeur <strong>mes talents et mes compétences</strong></li>
      <li><strong>Découvrir le monde professionnel</strong> et comprendre son fonctionnement et ses codes</li>
      <li><strong>Construire mon réseau</strong> pour trouver plus facilement et plus rapidement un emploi</li>
    </ul>
  </div>;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titre}>
          <h2>Mais en vrai, qu&apos;est-ce que j&apos;y gagne à long terme ?</h2>
          <strong>Le contrat d&apos;Engagement Jeune, c&apos;est tout bénéf&apos; pour moi !</strong>
        </div>
        {!displayAccordion && contenu}
        {displayAccordion && <span className={styles.accordion}><AccordionComponent>{contenu}</AccordionComponent></span>}
      </div>
    </section>
  );
}
