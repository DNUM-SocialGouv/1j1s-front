import React from 'react';

import {
  RechercherAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/RechercherAccompagnement';
import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { InfoJeunesCard } from '~/client/components/features/Partner/InfoJeunesCard';
import { MissionsLocalesCard } from '~/client/components/features/Partner/MissionsLocalesCard';
import { PoleEmploiCard } from '~/client/components/features/Partner/PoleEmploiCard';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import styles from '~/pages/accompagnement/Accompagnement.module.scss';

export default function Accompagnement() {

  if (process.env.NEXT_PUBLIC_RECHERCHE_ACCOMPAGNEMENT_FEATURE === '1') {
    return <RechercherAccompagnement />;
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
        {PartnerCardList([
          MissionsLocalesCard().props,
          InfoJeunesCard().props,
          PoleEmploiCard().props,
        ])}
      </main>
    </>
  );
}
