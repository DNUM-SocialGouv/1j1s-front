import React, { useRef } from 'react';

import { TémoignageKévin, TémoignageLatifa } from '~/client/components/features/ContratEngagementJeune//Témoignages/Témoignages';
import Accompagnement from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import Actions from '~/client/components/features/ContratEngagementJeune/Actions/Actions';
import Allocations from '~/client/components/features/ContratEngagementJeune/Allocations/Allocations';
import Application from '~/client/components/features/ContratEngagementJeune/Application/Application';
import Bannière from '~/client/components/features/ContratEngagementJeune/Bannière/Bannière';
import PourquoiCEstFaitPourMoi from '~/client/components/features/ContratEngagementJeune/Pourquoi/PourquoiCEstFaitPourMoi';
import QuEstCeQueCEst from '~/client/components/features/ContratEngagementJeune/QuEstCeQueCest/QuEstCeQueCEst';
import QuEstCeQueJyGagne from '~/client/components/features/ContratEngagementJeune/QuEstCeQueJyGagne/QuEstCeQueJyGagne';
import Rappel from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel';
import Bouée from '~/client/components/ui/Bouée/Bouée';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function ContratEngagementJeune() {
  const surface = useRef<HTMLElement>(null);
  return (
    <>
      <HeadTag
        title="Contrat Engagement Jeune"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu" ref={ surface }>
        <Bannière/>
        <QuEstCeQueCEst/>
        <Actions/>
        <PourquoiCEstFaitPourMoi/>
        <QuEstCeQueJyGagne/>
        <Allocations/>
        <TémoignageKévin id="témoignage-kévin"/>
        <TémoignageLatifa id="témoignage-latifa"/>
        <Accompagnement/>
        <Rappel/>
        <Application/>
        <Bouée surface={ surface } />
      </main>
    </>
  );
}
