import React from 'react';

import { AccordionComponent } from '~/client/components/ui/Accordion/AccordionComponent';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import styles from '~/pages/contrat-engagement-jeune/Actions.module.scss';

export default function Actions() {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const displayAccordion = isSmallScreen || isMediumScreen;
  const contenu = <article className={ styles.article }>
    <p><strong>Accueilli au sein de Pôle emploi ou de ma Mission Locale, en fonction de mon profil, de mes compétences et de mes envies, je pourrai avoir accès à :</strong></p>
    <ul>
      <li><strong className={ styles.soustitre }>Des points réguliers en tête-à-tête avec mon conseiller</strong> qui me suit tout au long de mon parcours et jusqu&apos;à ce que j&apos;accède à un emploi durable</li>
      <li><strong className={ styles.soustitre }>Des ateliers collectifs avec d&apos;autres jeunes</strong> pour partager nos expériences</li>
      <li><strong className={ styles.soustitre }>Des stages et immersions en entreprise</strong> pour découvrir différents métiers</li>
      <li><strong className={ styles.soustitre }>Toutes les solutions du plan  1 jeune, 1 solution :</strong> formations qualifiantes, service civique, prépa apprentissage, école de la 2ème chance (E2C), Epide, etc.</li>
      <li><strong className={ styles.soustitre }>Une appli pour suivre l&apos;évolution de mon parcours</strong> et tenir mes engagements</li>
    </ul>
  </article>;
  return (
    <section className={ styles.section }>
      <div className={ styles.container }>
        <article className= { styles.titre }>
          <h1 className= { styles.soustitre }>Concrètement qu&apos;est-ce qu&apos;on fait en Contrat d’Engagement Jeune ?</h1>
        </article>
        {!displayAccordion && contenu}
        {displayAccordion && (<AccordionComponent ariaId={1}>
          {contenu}
        </AccordionComponent>)}
      </div>
    </section>
  );
}
