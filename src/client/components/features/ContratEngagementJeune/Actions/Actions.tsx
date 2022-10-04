import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Actions/Actions.module.scss';
import Marked from '~/client/components/ui/Marked/Marked';
import { SeeMore } from '~/client/components/ui/SeeMore/SeeMore';
import useBreakpoint from '~/client/hooks/useBreakpoint';

const contenu = `
Accueilli au sein de Pôle emploi ou de ma Mission Locale, en fonction de mon profil, de mes compétences et de mes envies, je pourrai avoir accès à :

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
    <section className={ styles.actions }>
      <div className={ styles.actionsContainer }>
        <article className= { styles.actionsArticle }>
          <h2 className= { styles.actionsArticle__Title }>Concrètement qu&apos;est-ce qu&apos;on fait en Contrat d’Engagement Jeune ?</h2>
        </article>
        <article className= { styles.actionsArticle__Content }>{!displayAccordion && <Marked markdown={ contenu }/>}
          {displayAccordion && (
            <SeeMore>
              <Marked markdown={ contenu }/>
            </SeeMore>)}</article>
      </div>
    </section>
  );
}
