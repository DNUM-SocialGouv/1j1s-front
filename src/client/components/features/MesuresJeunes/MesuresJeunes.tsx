import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/MesuresJeunes/MesuresJeunes.module.scss';
import { LinkCard } from '~/client/components/ui/Card/LinkCard';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { SeeMore } from '~/client/components/ui/SeeMore/SeeMore';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useSanitize from '~/client/hooks/useSanitize';
import { CarteMesuresJeunes, MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';

interface MesuresJeunesProps {
  mesuresJeunes : MesuresJeunes
}



export function MesuresJeunesComponent({ mesuresJeunes }: MesuresJeunesProps) {
  const { vieProfessionnelle, accompagnement, aidesFinancieres, orienterFormer } = mesuresJeunes;

  const createMarkup = (markup: string) => ({ __html: markup });

  function CarteMesureJeune(carte: CarteMesuresJeunes, index: number){
    const titre = useSanitize(carte.titre);
    const bannière = carte.bannière.url;
    const url = useSanitize(carte.url);
    const contenu = useSanitize(carte.contenu);

    return <LinkCard
      key={index}
      imageUrl={bannière}
      link={url}
      linkLabel="En savoir plus"
      title={titre}
    >
      <div dangerouslySetInnerHTML={createMarkup(contenu)} />
    </LinkCard>;
  }

  function displayCartes(cardList: CarteMesuresJeunes[]){
    return cardList.slice(0,3).map((carte, index) => {
      return CarteMesureJeune(carte, index);
    });
  }

  function displayMoreCartes(cardList: CarteMesuresJeunes[]){
    return cardList.slice(3).map((carte, index) => {
      return CarteMesureJeune(carte, index);
    });
  }

  function displaySectionCartes(category: CarteMesuresJeunes[]) {
    return <>
      <div className={classNames(styles.cardList, styles.cardListPadding)}>
        {displayCartes(category)}
      </div>
      {(displayMoreCartes(category).length) > 3 &&
        <SeeMore>
          <div className={classNames(styles.cardList, styles.cardListPaddingSeeMore)}>
            {displayMoreCartes(category)}
          </div>
        </SeeMore>
      }
    </>;
  }

  return(
    <>
      <HeadTag title="Toutes les solutions pour l'avenir des jeunes | 1jeune1solution"/>
      <Hero className={styles.heroBackground} image="/images/banners/homepage.webp">
        <b>Plan 1jeune1solution : Découvrez les solutions pour</b><br/>
        <span className={styles.heroText}>aider chacun d&apos;entre vous à accéder à l&apos;emploi</span>
      </Hero>
      <main id="contenu">
        <section className={classNames(styles.section, styles.sectionVieProfessionnelle)}>
          <h2 id="offres" className={styles.sectionHeader}>
            Entrée dans la vie professionnelle
          </h2>
          {displaySectionCartes(vieProfessionnelle)}
        </section>

        <section className={classNames(styles.section, styles.sectionOrienterFormer)}>
          <h2 id="formation" className={styles.sectionHeader}>
            S&apos;orienter et se former
          </h2>
          {displaySectionCartes(orienterFormer)}
        </section>

        <section className={classNames(styles.section, styles.sectionParcoursAccompagnement)}>
          <h2 id="aides-orientation-accompagnement" className={styles.sectionHeader}>
            Parcours d&apos;accompagnement
          </h2>
          {displaySectionCartes(accompagnement)}
        </section>

        <section className={classNames(styles.section, styles.sectionAidesFinancières)}>
          <h2 id="engagement-benevolat" className={styles.sectionHeader}>
            Aides financières
          </h2>
          {displaySectionCartes(aidesFinancieres)}
        </section>
      </main>
    </>
  );
}
