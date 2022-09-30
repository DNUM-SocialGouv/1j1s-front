import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/Pourquoi/Pourquoi.module.scss';
import Marked from '~/client/components/ui/Marked/Marked';
import { SeeMore } from '~/client/components/ui/SeeMore/SeeMore';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function Pourquoi() {
  const { isLargeScreen, isSmallScreen, isMediumScreen } = useBreakpoint();
  const displayAccordion = isSmallScreen || isMediumScreen;
  return (
    <div className={styles.pourquoi}>
      <article>
        <section>
          { isLargeScreen && <Image src="/illustrations/mentorat-employeur.svg" alt="" layout="fixed" width={500} height={250}/> }
          <h2>Pourquoi participer à l’aventure du mentorat en tant qu’employeur ?</h2>
          {!displayAccordion && <Marked markdown={siVousÊtesEmployeur}/>}
          {displayAccordion && (
            <SeeMore>
              <Marked markdown={siVousÊtesEmployeur}/>
            </SeeMore>)}
        </section>
        <section>
          { isLargeScreen && <Image src="/illustrations/mentorat-citoyen.svg" alt="" layout="fixed" width={500} height={250}/>}
          <h2>Vous êtes citoyen : vous pouvez devenir mentor !</h2>
          {!displayAccordion && <Marked markdown={siVousÊtesCitoyen}/>}
          {displayAccordion && (
            <SeeMore>
              <Marked markdown={siVousÊtesCitoyen}/>
            </SeeMore>)}
        </section>
      </article>
    </div>);
}

const siVousÊtesEmployeur = `
+ Pour offrir la possibilité à ses collaborateurs de former un “binôme” avec un jeune, encadré par une structure spécialisée dans le mentorat
+ Pour contribuer à la valorisation de vos collaborateurs, au développement de leurs compétences (ex : bienveillance, écoute, conseil) et à leur épanouissement personnel
+ Pour permettre la mise en valeur de votre entreprise et de vos métiers 
`;

const siVousÊtesCitoyen = `
+ Pour partager votre expérience. Vous contribuerez à la réussite de jeunes et les ferez bénéficier de votre propre expérience
+ Pour favoriser l’égalité des chances. Vous continuerez à servir la société et demeurrez actif au sein d’un réseau dynamique, même à la retraite
+ Pour continuer à apprendre. Vous développerez votre réseau et vos compétences
`;


