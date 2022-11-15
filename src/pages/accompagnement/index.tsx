import classNames from 'classnames';
import Image from 'next/legacy/image';
import infoJeunesImage from 'public/images/logos/info-jeunes.svg';
import poleEmploiImage from 'public/images/logos/pole-emploi.svg';
import missionLocaleImage from 'public/images/logos/union-mission-locale.svg';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';
import Marked from '~/client/components/ui/Marked/Marked';
import SeeMore from '~/client/components/ui/SeeMore/SeeMore';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import styles from '~/pages/accompagnement/Accompagnement.module.scss';

export default function Accompagnement() {

  const { isSmallScreen } = useBreakpoint();

  const longueDescriptionUnionNationalesDesMissionsLocales = 'Les missions locales sont présentes sur l’ensemble du territoire national et permettent à tous les jeunes de 16 à 25 ans de surmonter les difficultés qui font obstacle à leur insertion professionnelle et sociale.<br />Avec un accompagnement global pour les jeunes, elles traitent l’ensemble des difficultés d’insertion: emploi, formation, orientation, mobilité, logement, santé, accès à la culture et aux loisirs.<br />Les conseillers missions locales vont avoir comme mission de préparer les jeunes candidats à une offre d’emploi, les aider à se maintenir dans l’emploi (soutien matériel, médiation jeune-employeur) et proposent également un accompagnement post emploi.<br />Au cours des entretiens, le conseiller aide le jeune à s’orienter et examine avec lui les moyens à mobiliser pour lever les freins à l’emploi.';
  const longueDescriptionInfoJeunes = 'La structure Info Jeunes (SIJ) accueille tous les jeunes (de 12 à 30 ans) anonymement et gratuitement.<br />Des professionnels sont là pour vous aider à trouver des informations et vous accompagner sur tous les sujets qui vous concernent ou vous intéressent ; qu’il s’agisse de scolarité, de formation, d’emploi, de logement, de loisirs, de préparer un départ vers l’étranger, ou encore de monter un projet pour lequel des aides sont disponibles…<br />De la documentation, des revues, des ordinateurs etc. sont disponibles en libre accès et la SIJ propose également un soutien pour l’élaboration de CV, la rédaction des lettres de motivation ou encore la préparation aux entretiens de recrutement.';
  const longueDescriptionPoleEmploi = 'Pôle emploi est le service public de l’emploi en France. Son rôle est d’indemniser les demandeurs d’emploi et de les accompagner vers le retour à l’emploi. <br />Avec son dispositif d’accompagnement intensif des jeunes (AIJ), Pôle emploi propose à tous les jeunes demandeurs d’emploi de 16 à 30 ans, un accompagnement personnalisé intensif d’une durée de 3 à 6 mois pour les aider à trouver ou retrouver plus rapidement un emploi. Durant ce parcours, un conseiller Pôle emploi spécialisé vous aide à bâtir un argumentaire pour mettre en avant vos points forts et vos atouts, vous enseigne les différentes techniques de recherche d’emploi, vous décrypte les attentes des recruteurs et vous permet d’élargir vos cibles professionnelles et de prospecter des employeurs.';

  function displayMissionLocaleLogoContainer() {
    return (
      <>
        <div className={classNames(styles.imageContainer, styles.missionLocaleImageContainer)}><Image src={missionLocaleImage} alt="" layout={'fill'}/></div>
        <div className={styles.petiteDescriptionStructure}>
          <span>Les missions locales proposent un suivi personnalisé</span>
          <br />
          <span>pour tous les jeunes jusqu’à 25 ans</span>
        </div>
      </>
    );
  }

  function displayInfoJeunesLogoContainer() {
    return (
      <>
        <div className={classNames(styles.imageContainer, styles.infoJeunesImageContainer)}><Image src={infoJeunesImage} alt="" layout={'fill'}/></div>
        <div className={styles.petiteDescriptionStructure}>
          <span>Info Jeunes, le réseau d’accueil et d’information des jeunes en France</span>
          <br />
          <span>au service d’une ambition : explorer les possibles !</span>
        </div>
      </>
    );
  }

  function displayPoleEmploiLogoContainer() {
    return <>
      <div className={classNames(styles.imageContainer, styles.poleEmploiImageContainer)}><Image src={poleEmploiImage} alt="" layout={'fill'}/></div>
      <div className={styles.petiteDescriptionStructure}>
        <span>Pôle emploi propose un accompagnement intensif</span>
        <br/>
        <span>pour les jeunes de 16 à 30 ans</span>
      </div>
    </>;
  }

  function displayBoutonRechercherMissionLocale() {
    return <div className={styles.missionLocaleButtonContainer}>
      <Link href="https://www.unml.info/les-missions-locales/annuaire/" appearance='asPrimaryButton'>Trouver ma mission locale</Link>
      <Link href="/articles/mission-locale" appearance='asSecondaryButton'>En savoir plus</Link>
    </div>;
  }


  function displayBoutonRechercherStructureAccueil() {
    return <Link href="https://infojeunesfrance.org/carte-interactive/" appearance="asPrimaryButton" className={styles.button}>Trouver ma structure Info Jeunes</Link>;
  }

  function displayBoutonRechercherCentrePoleEmploi() {
    return <Link href="https://www.pole-emploi.fr/annuaire/votre-pole-emploi.html" appearance="asPrimaryButton" className={styles.button}>Trouver mon centre Pôle Emploi</Link>;
  }

  return (
    <>
      <HeadTag
        title="Trouver un accompagnement | 1jeune1solution"
        description="Trouver un accompagnement"
      />
      <Hero>
        <h2 className={styles.accompagnementHero}>
          <div><b>Je recherche un accompagnement proche de chez moi,</b> je veux être aidé dans mes démarches et mon parcours</div>
          <div>Retrouvez les missions locales, les structures infos jeunes et les agences Pôle Emploi les plus proches de chez vous.</div>
        </h2>
      </Hero>
      <main id="contenu">
        {
          isSmallScreen ? <>
            <section className={classNames(styles.unionNationaleDesMissionsLocales, styles.accompagnementContainer)}>
              {displayMissionLocaleLogoContainer()}
              <SeeMore
                overridedClosedLabel="Lire la description"
                additionalClosedButtonClassName={styles.customSeeMoreClosed}>
                <Marked markdown={longueDescriptionUnionNationalesDesMissionsLocales}/>
              </SeeMore>
              {displayBoutonRechercherMissionLocale()}
            </section>

            <section className={classNames(styles.infosJeunes, styles.accompagnementContainer)}>
              {displayInfoJeunesLogoContainer()}
              <SeeMore
                overridedClosedLabel="Lire la description"
                additionalClosedButtonClassName={styles.customSeeMoreClosed}>
                <Marked markdown={longueDescriptionInfoJeunes}/>
              </SeeMore>
              {displayBoutonRechercherStructureAccueil()}
            </section>

            <section className={classNames(styles.poleEmploi, styles.accompagnementContainer)}>
              {displayPoleEmploiLogoContainer()}
              <SeeMore
                overridedClosedLabel="Lire la description"
                additionalClosedButtonClassName={styles.customSeeMoreClosed}>
                <Marked markdown={longueDescriptionPoleEmploi}/>
              </SeeMore>
              {displayBoutonRechercherCentrePoleEmploi()}
            </section>
          </> : <>
            <Container className={classNames(styles.unionNationaleDesMissionsLocales, styles.accompagnementContainer)}>
              <div className={styles.logoContainer}>
                {displayMissionLocaleLogoContainer()}
              </div>

              <div className={styles.longueDescriptionContainer}>
                <Marked markdown={longueDescriptionUnionNationalesDesMissionsLocales} />
                {displayBoutonRechercherMissionLocale()}
              </div>

            </Container>

            <div className={classNames(styles.infosJeunesWrapper, 'background-white-lilac')}>
              <Container className={classNames(styles.infosJeunes, styles.accompagnementContainer)}>
                <div className={styles.logoContainer}>
                  {displayInfoJeunesLogoContainer()}
                </div>

                <div className={styles.longueDescriptionContainer}>
                  <Marked markdown={longueDescriptionInfoJeunes}/>
                  {displayBoutonRechercherStructureAccueil()}
                </div>
              </Container>
            </div>

            <Container className={classNames(styles.poleEmploi, styles.accompagnementContainer)}>
              <div className={styles.logoContainer}>
                {displayPoleEmploiLogoContainer()}
              </div>

              <div className={styles.longueDescriptionContainer}>
                <Marked markdown={longueDescriptionPoleEmploi} />
                {displayBoutonRechercherCentrePoleEmploi()}
              </div>
            </Container>
          </>
        }
      </main>
    </>
  );
}
