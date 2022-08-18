import Image from 'next/image';
import React from 'react';

import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import Marked from '~/client/components/ui/Marked/Marked';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import styles from './JeDeviensMentor.module.scss';

const contenuHeader = `
1 jeune 1 mentor, accompagner un jeune pour l'aider à réussir
=============================================================

Faire la rencontre qui change tout !

*   **Vous êtes employeur ou citoyen et souhaitez devenir mentor ?**  
    Embarquer dans une aventure humaine hors du commun, pour partager votre expérience, favoriser l'égalité des chances et continuer à apprendre en accompagnant un jeune.

*   **Votre entreprise recrute ou porte une initiative pour les jeunes ? Rejoignez la mobilisation !**  
    Permettez à votre entreprise d’apporter des solutions pour les jeunes, rejoignez des milliers d’entreprises déjà engagées et bénéficiez de services inédits.
`;

const quEstCeQueLeMentorat = `
Qu'est-ce que le mentorat ?
===========================

Le mentorat est un engagement personnel pour le mentor comme pour le jeune mentoré, basé sur le volontariat de chaque côté, la confiance, la bienveillance et le respect mutuel. Il s'inscrit dans la durée : le "binôme" que forment le mentor et le jeune se rencontre plusieurs heures par mois, pendant au moins six mois. Le binôme est encadré par une structure, le plus souvent une association, qui offre un cadre sécurisé pour chacun.
`;

const siVousÊtesEmployeur = `
*   Pour offrir la possibilité à ses collaborateurs de former un “binôme” avec un jeune, encadré par une structure spécialisée dans le mentorat

*   Cela permet de contribuer à la valorisation de vos collaborateurs, au développement de leurs compétences (ex : bienveillance, écoute, conseil) et à leur épanouissement personnel

*   Le mentorat permettra également la mise en valeur de votre entreprise et de vos métiers
`;

const siVousÊtesCitoyen = `
*   Pour offrir la possibilité à ses collaborateurs de former un “binôme” avec un jeune, encadré par une structure spécialisée dans le mentorat

*   Cela permet de contribuer à la valorisation de vos collaborateurs, au développement de leurs compétences (ex : bienveillance, écoute, conseil) et à leur épanouissement personnel

*   Le mentorat permettra également la mise en valeur de votre entreprise et de vos métiers
`;

export default function MentoratPage() {
  const { isLargeScreen } = useBreakpoint();

  return (
    <>
      <HeadTag
        title="Je deviens mentor | 1jeune1solution"
        description="1 jeune 1 mentor, accompagner un jeune pour l’aider à réussir"
      />
      <main id="contenu">
        <div className={styles.heading}>
          <Marked markdown={contenuHeader} />

          <div className={styles.linkAsButtonWrapper}>
            <LinkAsButton
              href="https://www.1jeune1mentor.fr/formulaire-mentor?1jeune1solution"
              target="_blank"
            >
              Je deviens mentor
            </LinkAsButton>
            <LinkAsButton
              href="/les-entreprises-s-engagent"
              className={styles.linkAsButtonMentorat}
            >
              J&apos;engage mon entreprise
            </LinkAsButton>
          </div>
        </div>

        {
          isLargeScreen && 
          <article className={styles.quEstCeQueLeMentorat}>
            <Image src="/icons/community.svg" alt="" layout="fixed" width={120} height={120}/>
            <Marked markdown={quEstCeQueLeMentorat} />
          </article>
        }

        <div className={styles.body}>
          <h1>Pourquoi participer à l&apos;aventure du mentorat ?</h1>
          <article>
            {displayRaisonParticipationsMentoratEmployeur(isLargeScreen)}
            {displayRaisonParticipationsMentoratCitoyen(isLargeScreen)}
          </article>
        </div>

      </main>
    </>
  );
}

function displayRaisonParticipationsMentoratEmployeur(isLargeScreen: boolean) {
  return (
    <section>
      { isLargeScreen && <Image src="/images/employeurs/employeur.png" alt="" layout="fixed" width={500} height={250}/>}
      <div>Si vous êtes employeur :</div>

      <Marked markdown={siVousÊtesEmployeur} />
    </section>
  );
}

function displayRaisonParticipationsMentoratCitoyen(isLargeScreen: boolean) {
  return (
    <section>
      { isLargeScreen && <Image src="/images/employeurs/citoyen.png" alt="" layout="fixed" width={500} height={250}/>}
      <div className={styles.RaisonParticipationMentoratHeader}>
        Si vous êtes citoyen :
      </div>

      <Marked markdown={siVousÊtesCitoyen} />
    </section>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
