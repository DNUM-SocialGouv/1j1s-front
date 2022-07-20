import React from 'react';

import Actions from '~/client/components/features/ContratEngagementJeune/Actions/Actions';
import Allocations from '~/client/components/features/ContratEngagementJeune/Allocations/Allocations';
import Bannière from '~/client/components/features/ContratEngagementJeune/Bannière/Bannière';
import PourquoiCEstFaitPourMoi from '~/client/components/features/ContratEngagementJeune/Pourquoi/PourquoiCEstFaitPourMoi';
import QuEstCeQueCEst from '~/client/components/features/ContratEngagementJeune/QuEstCeQueCest/QuEstCeQueCEst';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import QuEstCeQueJyGagne from '~/pages/contrat-engagement-jeune/QuEstCeQueJyGagne';

export default function ContratEngagementJeune() {
  return (
    <>
      <HeadTag
        title='Contrat Engagement Jeune'
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id='contenu'>
        <Bannière />
        <QuEstCeQueCEst />
        <Actions />
        <PourquoiCEstFaitPourMoi/>
        <Allocations />
        <QuEstCeQueJyGagne />
      </main>
    </>
  );
}
