import classNames from 'classnames';
import React from 'react';

import { LinkCard } from '~/client/components/ui/Card/LinkCard';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { BookIcon } from '~/client/components/ui/Icon/book.icon';
import { BriefCaseIcon } from '~/client/components/ui/Icon/brief-case.icon';
import { CompassIcon } from '~/client/components/ui/Icon/compass.icon';
import { TrophyIcon } from '~/client/components/ui/Icon/trophy.icon';
import { SeeMore } from '~/client/components/ui/SeeMore/SeeMore';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/pages/index.module.scss';

export default function Accueil() {
  return (
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes | 1jeune1solution" />
      <Hero image="/images/banners/homepage.webp">
        <p><b>A chacun sa solution.</b></p>
        <p>Vous avez entre 13 et 30 ans ? Découvrez toutes les solutions pour votre avenir sur 1J1S !</p>
      </Hero>
      <main id="contenu">
        <section className={classNames(styles.section, styles.sectionNosOffres)}>
          <h2 id="offres" className={styles.sectionHeader}>
            <BriefCaseIcon className={styles.sectionNosOffresHeaderIcon} />
            Découvrez nos offres
          </h2>
          <div className={classNames(styles.cardList, styles.cardListPadding)}>
            <LinkCard
              imageUrl="/images/homepage/emploi.jpg"
              link="/emplois"
              linkLabel="Voir les offres"
              title="Emplois"
            >
              <p>Plus de 300 000 offres d’emplois sélectionnées spécialement pour vous</p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/alternance.jpg"
              link="/apprentissage"
              linkLabel="Voir les offres"
              title="Contrats d'alternance"
            >
              <p>Trouvez votre entreprise pour concrétiser vos projets d’alternance</p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/stage.jpg"
              link="/stages"
              linkLabel="Voir les offres"
              title="Stages"
            >
              <p>Plus de 20 000 offres de stages sélectionnées spécialement pour vous</p>
            </LinkCard>
          </div>

          <SeeMore>
            <div className={classNames(styles.cardList, styles.cardListPaddingSeeMore)}>
              <LinkCard
                imageUrl="/images/homepage/jobs-etudiants.jpg"
                link="/jobs-etudiants"
                linkLabel="Voir les offres"
                title="Jobs étudiants"
              >
                <p>Des milliers d&apos;offres d&apos;emplois pour les étudiants</p>
              </LinkCard>
              <LinkCard
                imageUrl="/images/homepage/entrepreneur.jpg"
                link="/"
                linkLabel="Voir les offres"
                title="Je veux devenir entrepreneur"
              >
                <p>Retrouvez les conseils, outils et structures d’accompagnement pour vous aider à entreprendre.</p>
              </LinkCard>
              <LinkCard
                imageUrl="/images/homepage/europe.jpg"
                link="/"
                linkLabel="Voir les offres"
                title="Une expérience en europe"
              >
                <p>Retrouvez des offres d&apos;emploi, des stages, des VIE | VIA et des aides financières pour une expérience en Europe.</p>
              </LinkCard>
            </div>
          </SeeMore>

        </section>

        <section className={classNames(styles.section, styles.sectionBesoinDeVousFormer)}>
          <h2 id="formation" className={styles.sectionHeader}>
            <BookIcon className={styles.sectionBesoinDeVousFormerHeaderIcon}/>
            Besoin de vous former ?
          </h2>
          <div className={styles.cardList}>
            <LinkCard
              imageUrl="/images/homepage/formation-alternance.jpg"
              link="/formations"
              linkLabel="En savoir plus"
              title="Formations en alternance"
            >
              <p>Plus de 40 000 formations accessibles pour réaliser votre projet et trouver un emploi</p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/formation-initiales.jpg"
              link="/formations"
              linkLabel="En savoir plus"
              title="Formations initiales"
            >
              <p>Plus de 20 000 formations accessibles pour réaliser votre projet et trouver un emploi</p>
            </LinkCard>
          </div>
        </section>

        <section className={classNames(styles.section, styles.sectionAidesOrientationAccompagnement)}>
          <h2 id="aides-orientation-accompagnement" className={styles.sectionHeader}>
            <CompassIcon className={styles.sectionAidesOrientationAccompagnementHeaderIcon} />
            Aides, orientation et accompagnement
          </h2>
          <div className={classNames(styles.cardList, styles.cardListPadding)}>
            <LinkCard
              imageUrl="/images/homepage/cej.jpg"
              link="/contrat-engagement-jeune"
              linkLabel="Découvrir le CEJ"
              title="Je découvre le Contrat d’Engagement Jeune (CEJ)"
            >
              <p>Avec La Boussole, trouvez les aides auxquelles vous avez droit : logement, santé, mobilité, emploi, culture, etc. </p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/aide.jpg"
              link="/mes-aides"
              linkLabel="Découvrir mes aides"
              title="J'accède à mes aides"
            >
              <p>Avec La Boussole, trouvez les aides auxquelles vous avez droit : logement, santé, mobilité, emploi, culture, etc. </p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/mentor.jpg"
              link="/mentorat"
              linkLabel="En savoir plus"
              title="Je souhaite échanger avec un mentor"
            >
              <p>Une association vous recontacte pour vous proposer le programme de mentorat adapté à vos besoins.</p>
            </LinkCard>
          </div>

          <SeeMore>
            <div className={classNames(styles.cardList, styles.cardListPaddingSeeMore)}>
              <LinkCard
                imageUrl="/images/homepage/accompagne.jpg"
                link="/"
                linkLabel="En savoir plus"
                title="Je souhaite être accompagné(e)"
              >
                <p>Une association vous recontacte pour vous proposer le programme de mentorat adapté à vos besoins.</p>
              </LinkCard>
              <LinkCard
                imageUrl="/images/homepage/créer-cv.jpg"
                link="/creer-mon-cv"
                linkLabel="En savoir plus"
                title="Je crée mon CV personnalisé"
              >
                <p>Mettez en avant vos compétences dans un CV, même si vous pensez ne pas avoir d’expérience.</p>
              </LinkCard>
            </div>
          </SeeMore>
        </section>

        <section className={classNames(styles.section, styles.sectionEngagementBénévolat)}>
          <h2 id="engagement-benevolat" className={styles.sectionHeader}>
            <TrophyIcon className={styles.sectionEngagementBénévolatHeaderIcon} />
            Engagement et bénévolat
          </h2>
          <div className={styles.cardList}>
            <LinkCard
              imageUrl="/images/homepage/service-civique.jpg"
              link="/service-civique"
              linkLabel="Voir les offres"
              title="Service civique"
            >
              <p>Je réalise une mission citoyenne de 6 à 12 mois, donnant le droit à une indemnisation</p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/benevolat.jpg"
              link="/benevolat"
              linkLabel="Voir les offres"
              title="Bénévolat"
            >
              <p>Je réalise une mission d&apos;engagement civique courte auprès d&apos;organisations publiques ou associatives</p>
            </LinkCard>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
