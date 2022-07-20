import React from 'react';

import { AccordionComponent } from '~/client/components/ui/Accordion/AccordionComponent';
import Marked from '~/client/components/ui/Marked/Marked';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import styles from '~/pages/contrat-engagement-jeune/Actions.module.scss';

const contenu = `
_Accueilli au sein de Pôle emploi ou de ma Mission Locale, en fonction de mon profil, de mes compétences et de mes envies, je pourrai avoir accès à :_

+ **Des points réguliers en tête-à-tête avec mon conseiller** qui me suit tout au long de mon parcours et jusqu'à ce que j'accède à un emploi durable
+ **Des ateliers collectifs avec d'autres jeunes** pour partager nos expériences
+ **Des stages et immersions en entreprise** pour découvrir différents métiers
+ **Toutes les solutions du plan 1 jeune, 1 solution :** formations qualifiantes, service civique, prépa apprentissage, école de la 2ème chance (E2C), Epide, etc.
+ **Une appli pour suivre l'évolution de mon parcours** et tenir mes engagements
`;

export default function Actions() {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const displayAccordion = isSmallScreen || isMediumScreen;
  
  return (
    <section className={ styles.section }>
      <div className={ styles.container }>
        <article className= { styles.titre }>
          <h1 className= { styles.soustitre }>Concrètement qu&apos;est-ce qu&apos;on fait en Contrat d’Engagement Jeune ?</h1>
        </article>
        {!displayAccordion && <Marked markdown={ contenu }/>}
        {displayAccordion && (<span className={ styles.accordion }><AccordionComponent ariaId={1}>
          <Marked markdown={ contenu }/>
        </AccordionComponent></span>)}
      </div>
    </section>
  );
}
