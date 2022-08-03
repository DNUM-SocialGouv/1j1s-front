import classNames from 'classnames';
import React from 'react';

import { LinkCard } from '~/client/components/ui/Card/LinkCard';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { SeeMore } from '~/client/components/ui/SeeMore/SeeMore';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/pages/index.module.scss';
import { CarteMesuresJeunes, MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';

interface MesuresJeunesProps {
  mesuresJeunes : MesuresJeunes
}

export function MesuresJeunesComponent({ mesuresJeunes }: MesuresJeunesProps) {
  const vieProfessionnelle = mesuresJeunes.vieProfessionnelle;
  const accompagnement = mesuresJeunes.accompagnement;
  const aidesFinancières = mesuresJeunes.aidesFinancieres;
  const orienterFormer = mesuresJeunes.orienterFormer;

  function displayCartes(cardList: CarteMesuresJeunes[]){
    return cardList.map((carte, index) => {
      if(index < 2){
        return <div className={classNames(styles.cardList, styles.cardListPadding)}>
          <LinkCard
            key={index}
            imageUrl={carte.bannière.url}
            link={carte.url}
            linkLabel="En savoir plus"
            title={carte.titre}
          >
            <p>{carte.contenu}</p>
          </LinkCard>
        </div>;
      }
      return <SeeMore key={index}>
        <div className={classNames(styles.cardList, styles.cardListPaddingSeeMore)}>
          <LinkCard
            imageUrl={carte.bannière.url}
            link={carte.url}
            linkLabel="En savoir plus"
            title={carte.titre}
          >
            <p>{carte.contenu}</p>
          </LinkCard>
        </div>
      </SeeMore>;
    });
  }

  return(
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes | 1jeune1solution" />
      <Hero image="/images/banners/homepage.webp">
        <b>Plan 1jeune1solution : Découvrez les solutions</b><br />
        pour aider chacun d&apos;entre vous à accéder à l&apos;emploi
      </Hero>
      <main id="contenu">
        <section className={classNames(styles.section, styles.sectionNosOffres)}>
          <h2 id="offres" className={styles.sectionHeader}>
            Entrée dans la vie professionnelle
          </h2>
          {displayCartes(vieProfessionnelle)}
        </section>

        <section className={classNames(styles.section, styles.sectionBesoinDeVousFormer)}>
          <h2 id="formation" className={styles.sectionHeader}>
            Parcours d&apos;accompagnement
          </h2>
          {displayCartes(orienterFormer)}
        </section>

        <section className={classNames(styles.section, styles.sectionAidesOrientationAccompagnement)}>
          <h2 id="aides-orientation-accompagnement" className={styles.sectionHeader}>
            Aides financières
          </h2>
          {displayCartes(accompagnement)}
        </section>

        <section className={classNames(styles.section, styles.sectionEngagementBénévolat)}>
          <h2 id="engagement-benevolat" className={styles.sectionHeader}>
            Engagement et bénévolat
          </h2>
          {displayCartes(aidesFinancières)}
        </section>
      </main>
    </>
  );
}
