import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { SeeMore } from '~/client/components/ui/SeeMore/SeeMore';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import styles from './Mentorat.module.scss';

export default function MentoratPage() {
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useBreakpoint();
  const buttonClassName = (isOpen: boolean) => classNames(styles.buttonAccordeon, !isOpen && styles.buttonAccordeonClosed);
  const seeMoreLabel = (isOpen: boolean) => !isOpen ? 'Lire plus' : 'Voir moins';

  return (
    <>
      <HeadTag
        title="Mentorat | 1jeune1solution"
        description="Se rendre utile tout en préparant son avenir grâce aux missions de service civique"
      />
      <main id="contenu">
        <div className={styles.heading}>
          <div className={styles.headingContainer}>
            <h1 className={styles.headingContainer__Title}>1 jeune 1 mentor, être accompagné par un mentor pour réussir</h1>
            <p className={styles.headingContainer__TextContentOrange}>
              Faites la rencontre qui change tout !
            </p>
            <div className={styles.headingContainer__TextContentWrapper}>
              <div className={styles.headingContainer__TextContent}>
                <span>
                  <p>
                  Vous avez moins de 30 ans ?
                  </p>
                  <p>
                  Rencontrez le mentor qui vous correspond et bénéficiez de son accompagnement régulier et de ses conseils pour atteindre vos objectifs : améliorer vos résultats scolaires, définir votre orientation, trouver vos premières expériences professionnelles…
                  </p>
                </span>
                <div className={styles.linkAsButtonWrapper}>
                  <LinkAsButton
                    href="https://www.1jeune1mentor.fr/formulaire?1jeune1solution"
                    target="_blank"
                  >
                    Je trouve mon mentor
                  </LinkAsButton>
                </div>
              </div>
              <div className={styles.headingContainer__TextContent}>
                <span>
                  <p>
                  Vous voulez devenir mentor ?
                  </p>
                  <p>
                  Embarquez dans une aventure humaine hors du commun, pour partager votre expérience, favoriser l&apos;égalité des chances et continuer à apprendre en accompagnant un jeune
                  </p>
                </span>
                <div className={styles.linkAsButtonWrapper}>
                  <LinkAsButton
                    href="/je-deviens-mentor"
                    target="_blank"
                  >
                    Je deviens mentor
                  </LinkAsButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(styles.contentContainerOnPrimary)}>
          <article className={styles.QuestCeQueMentoratWrapper}>
            { isLargeScreen && (
              <div className={styles.imageWrapper}>
                <Image src="/images/mentorat/questcequelementorat.jpg" alt="" layout="fill" objectFit="cover" objectPosition="top"/>
              </div>
            ) }
            <div className={styles.QuestCeQueMentoratContent}>
              <h1>Qu’est-ce que le mentorat ?</h1>
              <p>Le mentorat, c’est l’accompagnement individuel bénévole d’un jeune par un mentor, qui peut aussi bien être lycéen qu’étudiant, actif ou retraité. Le “binôme” que forment le mentor et le jeune se rencontre plusieurs fois par mois (pendant au moins 6 mois) pour répondre aux objectifs du mentoré selon son âge et ses besoins. Le binôme est encadré par une structure, le plus souvent une association, qui offre un cadre sécurisé pour chacun.</p>
            </div>
          </article>
        </div>

        <div className={classNames(styles.contentContainer)}>
          <article className={styles.RaisonParticipationMentoratWrapper}>
            <div className={styles.RaisonParticipationMentoratContent}>
              <span className={styles.RaisonParticipationMentoratContent__Title}>
                { isLargeScreen && <Image src="/icons/avatar.svg" alt=""  layout="fixed" width={80} height={80}/> }
                <h1>Pourquoi participer à l’aventure du mentorat ?</h1>
              </span>

              { (isSmallScreen || isMediumScreen)
                ? (<SeeMore customLabel={seeMoreLabel} customButtonClassName={ buttonClassName }><RaisonParticipationsMentorat/></SeeMore>)
                : (<RaisonParticipationsMentorat/>) }
            </div>
            { isLargeScreen && (
              <div className={styles.imageWrapper}>
                <Image src="/images/mentorat/aventuredumentorat.jpg" alt="" layout="fill" objectFit="cover"/>
              </div>
            ) }
          </article>
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
          <Icon name='arrow-right'/>
          <p>J’ai des difficultés à l’école</p>
        </div>
        <p>Votre mentor pourra vous aider à organiser votre travail et à améliorer vos résultats scolaires</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <Icon name='arrow-right'/>
          <p>Je ne sais pas quelle orientation choisir</p>
        </div>
        <p>Votre mentor pourra vous conseiller et vous guider</p>
      </div>

      <div className={styles.RaisonParticipationMentoratElement}>
        <div className={styles.RaisonParticipationMentoratElement__Title}>
          <Icon name='arrow-right'/>
          <p>Je cherche un stage, une alternance, un premier emploi</p>
        </div>
        <p>Votre mentor pourra vous aider et vous ouvrir son réseau professionnel</p>
      </div>
    </section>
  );
}
