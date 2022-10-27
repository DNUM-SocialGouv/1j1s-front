import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/EspaceJeune/EspaceJeune.module.scss';
import { EspaceJeuneFlippingCardList } from '~/client/components/features/EspaceJeune/EspaceJeuneFlippingCardList';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';

interface EspaceJeuneProps {
  espaceJeune : EspaceJeune
}

export function EspaceJeuneComponent({ espaceJeune }: EspaceJeuneProps) {
  const { vieProfessionnelle, accompagnement, aidesFinancières, orienterFormer } = espaceJeune;
  const MAX_CARTE_PER_ROW = 3;

  return (
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
          {EspaceJeuneFlippingCardList(vieProfessionnelle, MAX_CARTE_PER_ROW)}
        </section>

        <section className={classNames(styles.section, styles.sectionOrienterFormer)}>
          <h2 id="formation" className={styles.sectionHeader}>
            S&apos;orienter et se former
          </h2>
          {EspaceJeuneFlippingCardList(orienterFormer, MAX_CARTE_PER_ROW)}
        </section>

        <section className={classNames(styles.section, styles.sectionParcoursAccompagnement)}>
          <h2 id="aides-orientation-accompagnement" className={styles.sectionHeader}>
            Parcours d&apos;accompagnement
          </h2>
          {EspaceJeuneFlippingCardList(accompagnement, MAX_CARTE_PER_ROW)}
        </section>

        <section className={classNames(styles.section, styles.sectionAidesFinancières)}>
          <h2 id="engagement-benevolat" className={styles.sectionHeader}>
            Aides financières
          </h2>
          {EspaceJeuneFlippingCardList(aidesFinancières, MAX_CARTE_PER_ROW)}
        </section>
      </main>
    </>
  );
}
