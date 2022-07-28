import React from 'react';

import { TémoignageKévin } from '~/client/components/features/ContratEngagementJeune//Témoignages/Témoignages';
import Accompagnement from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import Actions from '~/client/components/features/ContratEngagementJeune/Actions/Actions';
import Allocations from '~/client/components/features/ContratEngagementJeune/Allocations/Allocations';
import Bannière from '~/client/components/features/ContratEngagementJeune/Bannière/Bannière';
import PourquoiCEstFaitPourMoi from '~/client/components/features/ContratEngagementJeune/Pourquoi/PourquoiCEstFaitPourMoi';
import QuEstCeQueCEst from '~/client/components/features/ContratEngagementJeune/QuEstCeQueCest/QuEstCeQueCEst';
import QuEstCeQueJyGagne from '~/client/components/features/ContratEngagementJeune/QuEstCeQueJyGagne/QuEstCeQueJyGagne';
import Rappel from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export default function ContratEngagementJeune() {
  return (
    <>
      <HeadTag
        title="Contrat Engagement Jeune"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu">
        <Bannière/>
        <QuEstCeQueCEst/>
        <Actions/>
        <PourquoiCEstFaitPourMoi/>
        <QuEstCeQueJyGagne/>
        <Allocations/>
        <TémoignageKévin id="témoignage-kévin"/>
        <Accompagnement/>
        <Rappel/>
      </main>
    </>
  );
}
