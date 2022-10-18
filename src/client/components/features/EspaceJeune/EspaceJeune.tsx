import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/EspaceJeune/EspaceJeune.module.scss';
import { CardFlip } from '~/client/components/ui/Card/CardFlip';
import { Hero } from '~/client/components/ui/Hero/Hero';
import Marked from '~/client/components/ui/Marked/Marked';
import SeeMore from '~/client/components/ui/SeeMore/SeeMore';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useSanitize from '~/client/hooks/useSanitize';
import { getExtrait } from '~/client/utils/getExtrait.utils';
import { CarteEspaceJeune, EspaceJeune } from '~/server/cms/domain/espaceJeune';

interface EspaceJeuneProps {
  espaceJeune : EspaceJeune
}

export function EspaceJeuneComponent({ espaceJeune }: EspaceJeuneProps) {
  const { vieProfessionnelle, accompagnement, aidesFinancières, orienterFormer } = espaceJeune;
  const MAX_CARTE_PER_ROW = 3;

  function CarteEspaceJeune(carte: CarteEspaceJeune, index: number) {
    const titre = useSanitize(carte.titre);
    const bannière = carte.bannière?.url || '';
    const url = useSanitize(carte.url);
    const link = carte.article
      ? `/articles/${carte.article.slug}`
      : url;
    const contenu = useSanitize(carte.contenu);
    const extrait = getExtrait(contenu, 110);
    const concerné = useSanitize(carte.concerné) || '';

    return <CardFlip
      key={index}
      imageUrl={bannière}
      link={link}
      title={titre}
      flipCardContent={concerné}
      data-testid="card"
    >
      <Marked markdown={extrait} />
    </CardFlip>;
  }



  function displayCartes(cardList: CarteEspaceJeune[]) {
    return cardList.slice(0, MAX_CARTE_PER_ROW).map((carte, index) => {
      return CarteEspaceJeune(carte, index);
    });
  }

  function displayMoreCartes(cardList: CarteEspaceJeune[]) {
    return cardList.slice(MAX_CARTE_PER_ROW).map((carte, index) => {
      return CarteEspaceJeune(carte, index);
    });

  }

  function displaySectionCartes(category: CarteEspaceJeune[]) {
    return <>
      <div className={classNames(styles.cardList, styles.cardListPadding)}>
        {displayCartes(category)}
      </div>
      {category.length > MAX_CARTE_PER_ROW &&
        <SeeMore>
          <div className={classNames(styles.cardList, styles.cardListPadding)}>
            {displayMoreCartes(category)}
          </div>
        </SeeMore>
      }
    </>;
  }

  return(
    <>
      <HeadTag title="Espace jeune | 1jeune1solution"/>
      <Hero className={styles.bannière} image="/illustrations/espace-jeune.svg">
        <span>Plan 1jeune1solution : Découvrez les solutions pour </span>
        <span>aider chacun d&apos;entre vous à accéder à l&apos;emploi</span>
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
          {displaySectionCartes(aidesFinancières)}
        </section>
      </main>
    </>
  );
}
