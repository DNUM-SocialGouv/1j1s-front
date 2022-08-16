import Image from 'next/image';
import React from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import styles from './JeDeviensMentor.module.scss';

export default function MentoratPage() {
  const { isLargeScreen } = useBreakpoint();

  return (
    <>
      <HeadTag
        title="Je deviens mentor| 1jeune1solution"
        description="1 jeune 1 mentor, accompagner un jeune pour l’aider à réussir"
      />
      <main id="contenu">
        <div className={styles.heading}>
          <h1>1 jeune 1 mentor, accompagner un jeune pour l&apos;aider à réussir</h1>
          <p>
            Faire la rencontre qui change tout !
          </p>
          <p>
            <strong>Vous souhaitez devenir mentor ?</strong>
            <br/>
            Embarquer dans une aventure humaine hors du commun, pour partager votre expérience, favoriser l&apos;égalisté des chances et continuer à apprendre en accompagnant un jeune
          </p>

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
            <h1>Qu&apos;est-ce que le mentorat ?</h1>
            <p>Le mentorat est un engagement personnel pour le mentor comme pour le jeune mentoré, basé sur le volontariat de chaque côté, la confiance, la bienveillance et le respect mutuel. Il s&apos;inscrit dans la durée : le &quot;binôme&quot; que forment le mentor et le jeune se rencontre plusieurs heures par mois, pendant au moins six mois. Le binôme est encadré par une structure, le plus souvent une association, qui offre un cadre sécurisé pour chacun.</p>
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
    <section className={styles.RaisonParticipationMentoratContainer}>
      { isLargeScreen && <Image src="/images/employeurs/employeur.png" alt="" layout="fixed" width={500} height={250}/>}
      <div>Si vous êtes employeur :</div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <Icon name='arrow-right'/>
        <p>Pour offrir la possibilité à ses collaborateurs de former un “binôme” avec un jeune, encadré par une structure spécialisée dans le mentorat</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <Icon name='arrow-right'/>
        <p>Cela permet de contribuer à la valorisation de vos collaborateurs, au développement de leurs compétences (ex : bienveillance, écoute, conseil) et à leur épanouissement personnel </p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <Icon name='arrow-right'/>
        <p>Le mentorat permettra également la mise en valeur de votre entreprise et de vos métiers</p>
      </div>
    </section>
  );
}

function displayRaisonParticipationsMentoratCitoyen(isLargeScreen: boolean) {
  return (
    <section className={styles.RaisonParticipationMentoratContainer}>
      { isLargeScreen && <Image src="/images/employeurs/citoyen.png" alt="" layout="fixed" width={500} height={250}/>}
      <div className={styles.RaisonParticipationMentoratHeader}>
        Si vous êtes citoyen :
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <Icon name='arrow-right'/>
        <p>Pour partager votre expérience. Vous contribuerez à la réussite de jeunes et les ferez bénéficier de votre propre expérience</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <Icon name='arrow-right'/>
        <p>Pour favoriser l&apos;égalité des chances. Vous continuerez à servir la société et demeurez actif au sein d&apos;un réseau dynamique, même à la retraite</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <Icon name='arrow-right'/>
        <p>Pour continuer à apprendre. Vous développerez votre réseau et vos compétences</p>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
