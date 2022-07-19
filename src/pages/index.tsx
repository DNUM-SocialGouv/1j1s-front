import classNames from 'classnames';
import React from 'react';

import { AccordionComponent } from '~/client/components/ui/Accordion/AccordionComponent';
import { LinkCard } from '~/client/components/ui/Card/LinkCard';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { BookIcon } from '~/client/components/ui/Icon/book.icon';
import { BriefCaseIcon } from '~/client/components/ui/Icon/brief-case.icon';
import { CompassIcon } from '~/client/components/ui/Icon/compass.icon';
import { TrophyIcon } from '~/client/components/ui/Icon/trophy.icon';
import { RadioButton } from '~/client/components/ui/RadioButton/RadioButton';
import { RadioButtonGroup } from '~/client/components/ui/RadioButtonGroup/RadioButtonGroup';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/pages/index.module.css';

export default function Accueil() {
  return (
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes | 1jeune1solution" />
      <Hero image="/images/banners/homepage.webp">
        <b>A chacun sa solution.</b><br />
        Vous avez entre 13 et 30 ans ?<br/>
        Découvrez toutes les solutions pour<br />
        votre avenir sur 1J1S !
      </Hero>
      <RadioButtonGroup>
        <RadioButton id={'dodo'} label={'hello radio'} name={'laradio'} value={'hello'}/>
        <RadioButton id={'toto'} label={'hello radio bis'} name={'laradio2'} value={'world'}/>
      </RadioButtonGroup>

      <main id="contenu">
        <section className={classNames(styles.section, styles.section1)}>
          <h2 className={styles.sectionHeader}>
            <BriefCaseIcon />
            Découvrez nos offres
          </h2>
          <div className={classNames(styles.cardList, styles.cardListPadding)}>
            <LinkCard
              imageUrl="/images/homepage/emploi.png"
              link="/emplois"
              linkLabel="Voir les offres"
              title="Emplois"
              type="internal"
            >
              <p>Plus de 300 000 offres d’emplois sélectionnées spécialement pour vous</p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/alternance.png"
              link="/apprentissage"
              linkLabel="Voir les offres"
              title="Contrats d'alternance"
              type="internal"
            >
              <p>Trouvez votre entreprise pour concrétiser vos projets d’alternance</p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/stage.png"
              link="/"
              linkLabel="Voir les offres"
              title="Stages"
              type="internal"
            >
              <p>Plus de 20 000 offres de stages sélectionnées spécialement pour vous</p>
            </LinkCard>
          </div>

          <AccordionComponent>
            <div className={classNames(styles.cardList, styles.cardListPaddingAccordion)}>
              <LinkCard
                imageUrl="/images/homepage/jobs-etudiants.png"
                link="/jobs-etudiants"
                linkLabel="Voir les offres"
                title="Jobs étudiants"
                type="internal"
              >
                <p>Des milliers d&apos;offres d&apos;emplois pour les étudiants</p>
              </LinkCard>
              <LinkCard
                imageUrl="/images/homepage/entrepreneur.png"
                link="/"
                linkLabel="Voir les offres"
                title="Je veux devenir entrepreneur"
                type="internal"
              >
                <p>Retrouvez les conseils, outils et structures d’accompagnement pour vous aider à entreprendre.</p>
              </LinkCard>
              <LinkCard
                imageUrl="/images/homepage/europe.png"
                link="/"
                linkLabel="Voir les offres"
                title="Une expérience en europe"
                type="internal"
              >
                <p>Retrouvez des offres d&apos;emploi, des stages, des VIE | VIA et des aides financières pour une expérience en Europe.</p>
              </LinkCard>
            </div>
          </AccordionComponent>

        </section>

        <section className={classNames(styles.section, styles.section2)}>
          <h2 className={styles.sectionHeader}>
            <BookIcon />
            Besoin de vous former ?
          </h2>
          <div className={styles.cardList}>
            <LinkCard
              imageUrl="/images/homepage/formation-alternance.png"
              link="/apprentissage"
              linkLabel="Voir les formations"
              title="Formations en alternance"
              type="internal"
            >
              <p>Plus de 40 000 formations accessibles pour réaliser votre projet et trouver un emploi</p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/formation-initiales.png"
              link="/"
              linkLabel="Voir les formations"
              title="Formations initiales"
              type="internal"
            >
              <p>Plus de 20 000 formations accessibles pour réaliser votre projet et trouver un emploi</p>
            </LinkCard>
          </div>
        </section>

        <section className={classNames(styles.section, styles.section3)}>
          <h2 className={styles.sectionHeader}>
            <CompassIcon />
            Aides, orientation et accompagnement
          </h2>
          <div className={classNames(styles.cardList, styles.cardListPadding)}>
            <LinkCard
              imageUrl="/images/homepage/cej.png"
              link="/contrat-engagement-jeune"
              linkLabel="Découvrir le CEJ"
              title="Je découvre le Contrat d’Engagement Jeune (CEJ)"
              type="internal"
            >
              <p>Avec La Boussole, trouvez les aides auxquelles vous avez droit : logement, santé, mobilité, emploi, culture, etc. </p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/aide.png"
              link="/mes-aides"
              linkLabel="Découvrir mes aides"
              title="J'accède à mes aides"
              type="internal"
            >
              <p>Avec La Boussole, trouvez les aides auxquelles vous avez droit : logement, santé, mobilité, emploi, culture, etc. </p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/mentor.png"
              link="/mentorat"
              linkLabel="En savoir plus"
              title="Je souhaite échanger avec un mentor"
              type="internal"
            >
              <p>Une association vous recontacte pour vous proposer le programme de mentorat adapté à vos besoins.</p>
            </LinkCard>
          </div>

          <AccordionComponent>
            <div className={classNames(styles.cardList, styles.cardListPaddingAccordion)}>
              <LinkCard
                imageUrl="/images/homepage/accompagne.png"
                link="/"
                linkLabel="En savoir plus"
                title="Je souhaite être accompagné(e)"
                type="internal"
              >
                <p>Une association vous recontacte pour vous proposer le programme de mentorat adapté à vos besoins.</p>
              </LinkCard>
            </div>
          </AccordionComponent>
        </section>

        <section className={classNames(styles.section, styles.section4)}>
          <h2 className={styles.sectionHeader}>
            <TrophyIcon />
            Engagement et bénévolat
          </h2>
          <div className={styles.cardList}>
            <LinkCard
              imageUrl="/images/homepage/service-civique.png"
              link="/service-civique"
              linkLabel="Voir les offres"
              title="Service civique"
              type="internal"
            >
              <p>Je réalise une mission citoyenne de 6 à 12 mois, donnant le droit à une indemnisation</p>
            </LinkCard>
            <LinkCard
              imageUrl="/images/homepage/benevolat.png"
              link="/benevolat"
              linkLabel="Voir les offres"
              title="Bénévolat"
              type="internal"
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
