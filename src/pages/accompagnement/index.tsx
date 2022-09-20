import Image from 'next/image';
import Link from 'next/link';
import infoImage from 'public/images/accompagnement/info.png';
import poleImage from 'public/images/accompagnement/pole.png';
import unionImage from 'public/images/accompagnement/union.png';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Button } from '~/client/components/ui/Button/Button';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import Marked from '~/client/components/ui/Marked/Marked';
import { SeeMore } from '~/client/components/ui/SeeMore/SeeMore';
import styles from '~/pages/accompagnement/Accompagnement.module.scss';


export default function Accompagnement() {

  const longueDescriptionUnionNationalesDesMissionsLocales = 'Les missions locales sont présentes sur l’ensemble du territoire national et permettent à tous les jeunes de 16 à 25 ans de surmonter les difficultés qui font obstacle à leur insertion professionnelle et sociale.<br />Avec un accompagnement global pour les jeunes, elles traitent l’ensemble des difficultés d’insertion: emploi, formation, orientation, mobilité, logement, santé, accès à la culture et aux loisirs.<br />Les conseillers missions locales vont avoir comme mission de préparer les jeunes candidats à une offre d’emploi, les aider à se maintenir dans l’emploi (soutien matériel, médiation jeune-employeur) et proposent également un accompagnement post emploi.<br />Au cours des entretiens, le conseiller aide le jeune à s’orienter et examine avec lui les moyens à mobiliser pour lever les freins à l’emploi.';
  const longueDescriptionInfoJeunes = 'La structure Info Jeunes (SIJ) accueille tous les jeunes (de 12 à 30 ans) anonymement et gratuitement.<br />Des professionnels sont là pour vous aider à trouver des informations et vous accompagner sur tous les sujets qui vous concernent ou vous intéressent ; qu’il s’agisse de scolarité, de formation, d’emploi, de logement, de loisirs, de préparer un départ vers l’étranger, ou encore de monter un projet pour lequel des aides sont disponibles…<br />De la documentation, des revues, des ordinateurs etc. sont disponibles en libre accès et la SIJ propose également un soutien pour l’élaboration de CV, la rédaction des lettres de motivation ou encore la préparation aux entretiens de recrutement.';
  const longueDescriptionPoleEmploi = 'Pôle emploi est le service public de l’emploi en France. Son rôle est d’indemniser les demandeurs d’emploi et de les accompagner vers le retour à l’emploi. <br />Avec son dispositif d’accompagnement intensif des jeunes (AIJ), Pôle emploi propose à tous les jeunes demandeurs d’emploi de 16 à 30 ans, un accompagnement personnalisé intensif d’une durée de 3 à 6 mois pour les aider à trouver ou retrouver plus rapidement un emploi. Durant ce parcours, un conseiller Pôle emploi spécialisé vous aide à bâtir un argumentaire pour mettre en avant vos points forts et vos atouts, vous enseigne les différentes techniques de recherche d’emploi, vous décrypte les attentes des recruteurs et vous permet d’élargir vos cibles professionnelles et de prospecter des employeurs.';

  return (
    <>
      <LightHero
        primaryText="Je recherche un accompagnement proche de chez moi, je veux être aidé dans mes démarches et mon parcours"
        secondaryText="Retrouvez les missions locales, les structures infos jeunes et les agences Pôle Emploi les plus proches de chez vous."
      />
      <Container>
        <section className={styles.unionNationaleDesMissionsLocales}>
          <div className={styles.unionImageContainer}><Image src={unionImage} alt=""/></div>
          <div className={styles.petiteDescriptionStructure}>
            <span>Les missions locales proposent un suivi personnalisé</span>
            <br />
            <span>pour tous les jeunes jusqu’à 25 ans</span>
          </div>
          <SeeMore additionalClassName={styles.seeMore}> <Marked markdown={ longueDescriptionUnionNationalesDesMissionsLocales }/></SeeMore>
          <Link href="https://www.unml.info/les-missions-locales/annuaire/">
            <Button buttonType={'withRightIcon'} icon={<ExternalRedirectionIcon />} className={styles.buttonChercher}>Chercher une mission locale</Button>
          </Link>
        </section>

        <section className={styles.infosJeunes}>
          <div className={styles.infoJeunesImageContainer}><Image src={infoImage} alt=""/></div>
          <div className={styles.petiteDescriptionStructure}>
            <span>Info Jeunes, le réseau d’accueil et d’information des jeunes en France</span>
            <br />
            <span>au service d’une ambition : explorer les possibles !</span>
          </div>
          <SeeMore additionalClassName={styles.seeMore}><Marked markdown={ longueDescriptionInfoJeunes }/></SeeMore>
          <Link href="https://infojeunesfrance.org/carte-interactive/">
            <Button buttonType={'withRightIcon'} icon={<ExternalRedirectionIcon />} className={styles.buttonChercher}>Chercher une structure d’accueil</Button>
          </Link>
        </section>

        <section className={styles.poleEmploi}>
          <div className={styles.poleEmploiImageContainer}><Image src={poleImage} alt=""/></div>
          <div className={styles.petiteDescriptionStructure}>
            <span>Pôle emploi propose un accompagnement intensif</span>
            <br />
            <span>pour les jeunes de 16 à 30 ans</span>
          </div>
          <SeeMore additionalClassName={styles.seeMore}><Marked markdown={ longueDescriptionPoleEmploi }/></SeeMore>
          <Link href="https://www.pole-emploi.fr/annuaire/votre-pole-emploi.html">
            <Button buttonType={'withRightIcon'} icon={<ExternalRedirectionIcon />} className={styles.buttonChercher}>Chercher un centre pôle emploi</Button>
          </Link>
        </section>
      </Container>
    </>
  );
}
