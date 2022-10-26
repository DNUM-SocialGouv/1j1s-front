import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/Pourquoi/Pourquoi.module.scss';
import SeeMore from '~/client/components/ui/SeeMore/SeeMore';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function Pourquoi() {
  const { isLargeScreen, isSmallScreen, isMediumScreen } = useBreakpoint();
  const displayAccordion = isSmallScreen || isMediumScreen;

  function displayListeCitoyen() {
    return <ul aria-label={'Liste pourquoi vous pouvez devenir mentor'} className={styles.listeCitoyen}>
      <li>Pour partager votre expérience. Vous contribuerez à la réussite de jeunes et les ferez bénéficier de votre propre expérience</li>
      <li>Pour favoriser l’égalité des chances. Vous continuerez à servir la société et demeurrez actif au sein d’un réseau dynamique, même à la retraite</li>
      <li>Pour continuer à apprendre. Vous développerez votre réseau et vos compétences</li>
    </ul>;
  }

  function displayListeEmployeur() {
    return <ul aria-label={'Liste pourquoi participer à l’aventure du mentorat en tant qu’employeur'} className={styles.listeEmployeur}>
      <li>Pour offrir la possibilité à ses collaborateurs de former un “binôme” avec un jeune, encadré par une structure spécialisée dans le mentorat</li>
      <li>Pour contribuer à la valorisation de vos collaborateurs, au développement de leurs compétences (ex : bienveillance, écoute, conseil) et à leur épanouissement personnel</li>
      <li>Pour permettre la mise en valeur de votre entreprise et de vos métiers</li>
    </ul>;
  }

  return (
    <div className={styles.pourquoi}>
      <article>
        <section>
          { isLargeScreen && <Image src="/illustrations/mentorat-employeur.svg" alt="" layout="fixed" width={500} height={300}/> }
          <h2>Pourquoi participer à l’aventure du mentorat en tant qu’employeur ?</h2>
          {!displayAccordion && displayListeEmployeur()}
          {displayAccordion && (
            <SeeMore>
              {displayListeEmployeur()}
            </SeeMore>)}
        </section>
        <section>
          { isLargeScreen && <Image src="/illustrations/mentorat-citoyen.svg" alt="" layout="fixed" width={500} height={300}/>}
          <h2>Vous êtes citoyen : vous pouvez devenir mentor !</h2>
          {!displayAccordion && displayListeCitoyen()}
          {displayAccordion && (
            <SeeMore>
              {displayListeCitoyen()}
            </SeeMore>)}
        </section>
      </article>
    </div>);
}


