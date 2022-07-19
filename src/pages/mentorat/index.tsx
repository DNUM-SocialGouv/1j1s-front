import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { ButtonLink } from '~/client/components/ui/Button/ButtonLink';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { IconColor } from '~/client/components/ui/Icon/icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import styles from './Mentorat.module.scss';

export default function MentoratPage() {
  const { isLargeScreen, isXLargeScreen } = useBreakpoint();
  const isMinimumLargeScreen = isLargeScreen || isXLargeScreen;

  return (
    <>
      <div className={styles.heading}>

        <div className={styles.headingContainerWrapper}>
          <div className={styles.headingContainer}>
            <h1>1 jeune 1 mentor, être accompagné par un mentor pour réussir</h1>
            <h2>Faire la rencontre qui change tout !</h2>
            <div className={styles.headingContainer__textContent}>
              <p>Vous avez moins de 30 ans ?</p>
              <p>Trouvez le mentor qui vous correspond ! Grâce à son accompagnement régulier et ses conseils.</p>
            </div>

            <div className={styles.buttonWrapper}>
              <ButtonLink label="Je trouve mon mentor"
                href="https://www.1jeune1mentor.fr/formulaire?1jeune1solution"
                target="_blank"/>
            </div>
          </div>

        </div>

        { isMinimumLargeScreen &&
        <div className={styles.imageWrapper}>
          <Image src="/images/mentoratpage/mentorat.jpg" alt="" layout="fill" objectFit="cover" objectPosition="right"/>
        </div>
        }

      </div>

      <div className={styles.content}>
        <div className={classNames(styles.contentContainer, styles.contentContainerOnPrimary, styles.contentContainerSeparator)}>
          <article className={styles.RaisonParticipationMentoratWrapper}>
            <div className={styles.content__articleTitle}>
              { isMinimumLargeScreen && <Image src="/images/mentoratpage/avatar.svg" alt="" width={120} height={120}/> }
              <h1>Pourquoi participer à l’aventure du mentorat ?</h1>
            </div>
            <RaisonParticipationsMentorat/>
          </article>
        </div>

        <div className={styles.contentContainer}>
          <article className={styles.QuestCeQueMentoratWrapper}>
            <div className={styles.content__articleTitle}>
              { isMinimumLargeScreen && <Image src="/images/mentoratpage/community.svg" alt="" width={120} height={120}/> }
              <h1>Qu’est-ce que le mentorat ?</h1>
            </div>
            <p>Le mentorat est un engagement personnel pour le mentor comme pour le jeune mentoré, basé sur le volontariat de chaque côté, la confiance, la bienveillance et le respect mutuel. Il s&apos;inscrit dans la durée : le &quot;binôme&quot; que forment le mentor et le jeune se rencontre plusieurs heures par mois, pendant au moins six mois. Le binôme est encadré par une structure, le plus souvent une association, qui offre un cadre sécurisé pour chacun.</p>
          </article>
        </div>



      </div>
    </>
  );
}

function RaisonParticipationsMentorat() {
  return (
    <section className={styles.RaisonParticipationMentoratContainer}>
      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <ArrowRightIcon color={IconColor.COLOR_ON_PRIMARY}/>
          <h2>J’ai des difficultés à l’école</h2>
        </div>
        <p>Votre mentor pourra vous aider à organiser votre travail et à améliorer vos résultats scolaires</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <ArrowRightIcon color={IconColor.COLOR_ON_PRIMARY}/>
          <h2>Je ne sais pas quelle orientation choisir</h2>
        </div>
        <p>Votre mentor pourra vous conseiller et vous guider</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <ArrowRightIcon color={IconColor.COLOR_ON_PRIMARY}/>
          <h2>Je cherche un stage, une alternance, un premier emploi</h2>
        </div>
        <p>Votre mentor pourra vous aider et vous ouvrir son réseau professionnel</p>
      </div>
    </section>
  );
}
