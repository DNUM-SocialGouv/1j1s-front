import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { Icon } from '~/client/components/ui/Icon/icon';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import styles from './Mentorat.module.scss';

export default function MentoratPage() {
  const { isLargeScreen, isXLargeScreen } = useBreakpoint();

  return (
    <>
      <HeadTag
        title="Mentorat | 1jeune1solution"
        description="Se rendre utile tout en préparant son avenir grâce aux missions de service civique"
      />
      <main id="contenu">
        <div className={styles.heading}>

          <div className={styles.headingContainerWrapper}>
            <div className={styles.headingContainer}>
              <h1 className={styles.headingContainer__Title}>1 jeune 1 mentor, être accompagné par un mentor pour réussir</h1>
              <p className={styles.headingContainer__TextContentOrange}>
                Faire la rencontre qui change tout !
              </p>
              <p className={styles.headingContainer__TextContent}>
                <strong>Vous avez moins de 30 ans ?</strong>
                <br/>
                Trouvez le mentor qui vous correspond ! Grâce à son accompagnement régulier et ses conseils.
              </p>

              <div className={styles.linkAsButtonWrapper}>
                <LinkAsButton
                  href="https://www.1jeune1mentor.fr/formulaire?1jeune1solution"
                  target="_blank"
                >
                  Je trouve mon mentor
                </LinkAsButton>
              </div>
            </div>

          </div>

          { (isLargeScreen || isXLargeScreen) &&
          <div className={styles.imageWrapper}>
            <Image src="/images/banners/mentorat.jpg" alt="" layout="fill" objectFit="cover" objectPosition="right"/>
          </div>
          }

        </div>

        <div className={styles.content}>
          <div className={classNames(styles.contentContainer, styles.contentContainerOnPrimary, styles.contentContainerSeparator)}>
            <article className={styles.RaisonParticipationMentoratWrapper}>
              <div className={styles.content__articleTitle}>
                { (isLargeScreen || isXLargeScreen) && <Image src="/icons/avatar.svg" alt=""  layout="fixed" width={120} height={120}/> }
                <h1>Pourquoi participer à l’aventure du mentorat ?</h1>
              </div>
              <RaisonParticipationsMentorat/>
            </article>
          </div>

          <div className={styles.contentContainer}>
            <article className={styles.QuestCeQueMentoratWrapper}>
              <div className={styles.content__articleTitle}>
                { (isLargeScreen || isXLargeScreen) && <Image src="/icons/community.svg" alt="" layout="fixed" width={120} height={120}/> }
                <h1>Qu’est-ce que le mentorat ?</h1>
              </div>
              <p>Le mentorat est un engagement personnel pour le mentor comme pour le jeune mentoré, basé sur le volontariat de chaque côté, la confiance, la bienveillance et le respect mutuel. Il s&apos;inscrit dans la durée : le &quot;binôme&quot; que forment le mentor et le jeune se rencontre plusieurs heures par mois, pendant au moins six mois. Le binôme est encadré par une structure, le plus souvent une association, qui offre un cadre sécurisé pour chacun.</p>
            </article>
          </div>

        </div>
      </main>
    </>
  );
}

function RaisonParticipationsMentorat() {
  return (
    <section className={styles.RaisonParticipationMentoratContainer}>
      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <ArrowRightIcon color={Icon.COLOR_ON_DARK_BACKGROUND}/>
          <p>J’ai des difficultés à l’école</p>
        </div>
        <p>Votre mentor pourra vous aider à organiser votre travail et à améliorer vos résultats scolaires</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <ArrowRightIcon color={Icon.COLOR_ON_DARK_BACKGROUND}/>
          <p>Je ne sais pas quelle orientation choisir</p>
        </div>
        <p>Votre mentor pourra vous conseiller et vous guider</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <ArrowRightIcon color={Icon.COLOR_ON_DARK_BACKGROUND}/>
          <p>Je cherche un stage, une alternance, un premier emploi</p>
        </div>
        <p>Votre mentor pourra vous aider et vous ouvrir son réseau professionnel</p>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
